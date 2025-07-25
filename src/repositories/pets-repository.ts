import { Pet, PetAge, PetEnergy, PetSize, PetType, Prisma } from "@prisma/client";

export interface findAllParams {
  city: string
  type?: PetType,
  age?: PetAge,
  size?: PetSize,
  energy?: PetEnergy,
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findAll(params: findAllParams): Promise<Pet[]>
}