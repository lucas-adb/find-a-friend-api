import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository.js";
import { AuthOrgUseCase } from "@/use-cases/auth-org.js";

export function makeAuthOrgUseCase() {
  const repository = new PrismaOrgsRepository();
  const useCase = new AuthOrgUseCase(repository);

  return useCase;
}