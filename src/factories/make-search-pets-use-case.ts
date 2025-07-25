import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository.js";
import { SearchPetUseCase } from "@/use-cases/search-pets.js";

export function makeSearchPetsUseCase() {
  const repository = new PrismaPetsRepository();
  const useCase = new SearchPetUseCase(repository);

  return useCase;
}