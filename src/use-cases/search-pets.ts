import { PetsRepository } from '@/repositories/pets-repository.js';
import {
  Pet,
  PetAge,
  PetEnergy,
  PetSize,
  PetType,
} from '@prisma/client';

interface SearchPetUseCaseRequest {
  city: string;
  type?: PetType;
  age?: PetAge;
  size?: PetSize;
  energy?: PetEnergy;
}

interface SearchPetUseCaseResponse {
  pets: Pet[];
}

export class SearchPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async search({
    city,
    type,
    age,
    size,
    energy,
  }: SearchPetUseCaseRequest): Promise<SearchPetUseCaseResponse> {
    const pets = await this.petsRepository.findAll({
      city,
      type,
      age,
      size,
      energy,
    });

    return { pets };
  }
}
