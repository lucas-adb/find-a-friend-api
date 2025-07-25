import { FastifyInstance } from 'fastify';
import { create } from './create-pet.js';
import { verifyJWT } from '@/http/middlewares/verify-jwt.js';
import { get } from './get-pet.js';
import { search } from './search-pets.js';

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);

  app.get('/pets/:id', get);
  app.get('/pets', search);
  app.post('/pets', create);
}
