import fastify from "fastify";
import { orgsRoutes } from "./http/controllers/orgs/orgs.routes.js";

export const app = fastify();

app.register(orgsRoutes);