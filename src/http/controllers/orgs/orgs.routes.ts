import { FastifyInstance } from "fastify";
import { create } from "./create-org.js";
import { auth } from "./auth-org.js";

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', create);
  app.post('/orgs/auth', auth);
}