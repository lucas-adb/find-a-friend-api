import { FastifyInstance } from "fastify";
import { create } from "./create-org.js";

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', create);
}