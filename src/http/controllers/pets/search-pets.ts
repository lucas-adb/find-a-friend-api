import { makeSearchPetsUseCase } from '@/factories/make-search-pets-use-case.js';
import { PetAge, PetEnergy, PetSize, PetType } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const querySchema = z.object({
    city: z.string(),
    type: z.enum(PetType).optional(),
    age: z.enum(PetAge).optional(),
    size: z.enum(PetSize).optional(),
    energy: z.enum(PetEnergy).optional(),
  });

  const { city, type, age, size, energy } = querySchema.parse(request.query);

  try {
    const useCase = makeSearchPetsUseCase();

    const { pets } = await useCase.search({
      city,
      type,
      age,
      size,
      energy,
    });

    return reply.status(200).send({ pets });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
