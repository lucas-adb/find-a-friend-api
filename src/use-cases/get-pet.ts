import { PetsRepository } from '@/repositories/pets-repository.js';
import { Pet } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error.js';

interface getPetUseCaseRequest {
  id: string;
}

interface getPetUseCaseResponse {
  pet: Pet;
}

export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async get({ id }: getPetUseCaseRequest): Promise<getPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(id);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    return { pet };
  }
}
