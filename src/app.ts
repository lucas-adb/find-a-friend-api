import fastify from 'fastify';
import { orgsRoutes } from './http/controllers/orgs/orgs.routes.js';
import z, { ZodError } from 'zod';
import { env } from './env/index.js';

export const app = fastify();

app.register(orgsRoutes);

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    const pretty = z.prettifyError(error);

    return reply.status(400).send({
      message: 'Validation error',
      issues: pretty,
    });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // todo: use an external tool
  }

  return reply.status(500).send({
    message: 'Internal Server Error',
  });
});
