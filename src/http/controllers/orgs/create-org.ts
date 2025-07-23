import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCreateOrgUseCase } from "@/factories/make-create-org-use-case.js";


export async function create(request: FastifyRequest, reply: FastifyReply) {
 const bodySchema = z.object({
    name: z.string(),
    email: z.email(),
    address: z.string(),
    phone: z.string(),
    password: z.string().min(6)
  });

  const { name, email, address, phone, password  } = bodySchema.parse(request.body);

  try {
    const useCase = makeCreateOrgUseCase();
    await useCase.create({
      name, email, address, phone, password
    });
  } catch (error) {
    console.error(error);
    // todo: add error for when org already exists
    throw error;
  }

  reply.status(201).send();
}