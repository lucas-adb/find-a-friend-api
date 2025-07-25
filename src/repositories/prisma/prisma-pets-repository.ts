import { Pet, Prisma } from '@prisma/client';
import { PetsRepository } from '../pets-repository.js';
import { prisma } from '@/lib/prisma.js';

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data });
    return pet;
  }
}
