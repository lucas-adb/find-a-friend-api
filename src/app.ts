import fastify from 'fastify';
import { orgsRoutes } from './http/controllers/orgs/orgs.routes.js';
import z, { ZodError } from 'zod';
import { env } from './env/index.js';
import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import { petsRoutes } from './http/controllers/pets/pets.routes.js';

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
});

app.register(fastifyCookie);

app.register(orgsRoutes);
app.register(petsRoutes);

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
