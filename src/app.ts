import fastify, { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "./lib/prisma.js";
import { hash } from "bcryptjs";

export const app = fastify();

app.post('/orgs', async (request: FastifyRequest, reply: FastifyReply) => {
  const bodySchema = z.object({
    name: z.string(),
    email: z.email(),
    address: z.string(),
    phone: z.string(),
    password: z.string()
  });

  const { name, email, address, phone, password  } = bodySchema.parse(request.body);

  const password_hash = await hash(password, 6);

  await prisma.org.create({
    data: {
      name, email, address, phone, password_hash
    }
  });

  reply.status(201).send();
});