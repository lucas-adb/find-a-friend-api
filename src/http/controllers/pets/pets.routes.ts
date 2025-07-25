import { FastifyInstance } from 'fastify';
import { create } from './create-pet.js';
import { verifyJWT } from '@/http/middlewares/verify-jwt.js';

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);

  app.post('/pets', create);
}
