import { makeAuthOrgUseCase } from '@/factories/make-auth-org-use-case.js';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error.js';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function auth(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    email: z.email(),
    password: z.string(),
  });

  const { email, password } = bodySchema.parse(request.body);

  try {
    const useCase = makeAuthOrgUseCase();
    await useCase.auth({ email, password });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: error.message,
      });
    }

    throw error;
  }

  reply.status(200).send({ email, password });
}
