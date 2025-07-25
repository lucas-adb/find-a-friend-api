import { makeGetPetUseCase } from '@/factories/make-get-pet-use-case.js';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string(),
  });

  const { id } = paramsSchema.parse(request.params);

  try {
    const useCase = makeGetPetUseCase();

    const { pet } = await useCase.get({
      id,
    });

    return reply.status(200).send({ pet });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      });
    }

    throw error;
  }
}
