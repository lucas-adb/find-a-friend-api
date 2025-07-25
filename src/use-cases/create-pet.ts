import { OrgsRepository } from '@/repositories/orgs-repository.js';
import { PetsRepository } from '@/repositories/pets-repository.js';
import { Pet, PetAge, PetEnergy, PetSize, PetType } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error.js';

interface createPetUseCaseRequest {
  name: string;
  type: PetType;
  age: PetAge;
  size: PetSize;
  energy: PetEnergy;
  description: string;
  org_id: string;
}

interface createPetUseCaseResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository
  ) {}

  async create({
    name,
    type,
    age,
    size,
    energy,
    description,
    org_id,
  }: createPetUseCaseRequest): Promise<createPetUseCaseResponse> {
    const org = await this.orgsRepository.findById(org_id);

    if (!org) {
      throw new ResourceNotFoundError();
    }

    const pet = await this.petsRepository.create({
      name,
      type,
      age,
      size,
      energy,
      description,
      org_id,
    });

    return {
      pet,
    };
  }
}
