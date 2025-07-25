import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository.js";
import { GetPetUseCase } from "@/use-cases/get-pet.js";

export function makeGetPetUseCase() {
  const repository = new PrismaPetsRepository();
  const useCase = new GetPetUseCase(repository);

  return useCase;
}