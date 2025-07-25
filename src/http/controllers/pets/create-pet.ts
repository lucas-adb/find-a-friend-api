import { makeCreatePetUseCase } from '@/factories/make-create-pet-use-case.js';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js';
import { PetAge, PetEnergy, PetSize, PetType } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    type: z.enum(PetType),
    age: z.enum(PetAge),
    size: z.enum(PetSize),
    energy: z.enum(PetEnergy),
    description: z.string(),
  });

  const { name, type, age, size, energy, description } = bodySchema.parse(
    request.body
  );

  try {
    const useCase = makeCreatePetUseCase();

    await useCase.create({
      name,
      type,
      age,
      size,
      energy,
      description,
      org_id: request.user.sub,
    });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      });
    }

    throw error;
  }

  return reply.status(201).send();
}
