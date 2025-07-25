import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository.js';
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository.js';
import { CreatePetUseCase } from '@/use-cases/create-pet.js';

export function makeCreatePetUseCase() {
  const repository = new PrismaPetsRepository();
  const orgRepository = new PrismaOrgsRepository();
  const useCase = new CreatePetUseCase(repository, orgRepository);

  return useCase;
}
