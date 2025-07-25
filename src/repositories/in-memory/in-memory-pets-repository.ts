import { Pet, Prisma } from '@prisma/client';
import { findAllParams, PetsRepository } from '../pets-repository.js';
import { randomUUID } from 'node:crypto';
import { InMemoryOrgRepository } from './in-memory-orgs-repository.js';

export class InMemoryPetRepository implements PetsRepository {
  public items: Pet[] = [];

  constructor(private orgsRepository: InMemoryOrgRepository) {}

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      name: data.name,
      type: data.type,
      age: data.age,
      size: data.size,
      energy: data.energy,
      description: data.description,
      org_id: data.org_id,
    };

    this.items.push(pet);

    return pet;
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === id);

    if (!pet) {
      return null;
    }

    return pet;
  }

  async findAll(params: findAllParams): Promise<Pet[]> {
    const orgByCity = this.orgsRepository.items.filter(
      (org) => org.city === params.city
    );

    const pets = this.items
      .filter((item) => orgByCity.some((org) => org.id === item.org_id))
      .filter((item) => (params.type ? item.type === params.type : true))
      .filter((item) => (params.age ? item.age === params.age : true))
      .filter((item) => (params.size ? item.size === params.size : true))
      .filter((item) => (params.energy ? item.energy === params.energy : true));

    return pets;
  }
}
