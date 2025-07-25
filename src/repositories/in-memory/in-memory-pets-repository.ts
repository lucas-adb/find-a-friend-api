import { Pet, Prisma } from '@prisma/client';
import { PetsRepository } from '../pets-repository.js';
import { randomUUID } from 'node:crypto';

export class InMemoryPetRepository implements PetsRepository {
  public items: Pet[] = [];

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
}
