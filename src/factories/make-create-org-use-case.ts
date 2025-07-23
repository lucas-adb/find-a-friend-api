import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository.js";
import { CreateOrgUseCase } from "@/use-cases/create-org.js";

export function makeCreateOrgUseCase() {
  const repository = new PrismaOrgsRepository();
  const useCase = new CreateOrgUseCase(repository);

  return useCase;
}