import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pets-repository.js';
import { beforeEach, describe, expect, test } from 'vitest';
import { CreatePetUseCase } from './create-pet.js';
import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-orgs-repository.js';
import { PetAge, PetEnergy, PetSize, PetType } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error.js';

let repository: InMemoryPetRepository;
let orgRepository: InMemoryOrgRepository;
let sut: CreatePetUseCase;

describe('Create Pet', () => {
  beforeEach(() => {
    repository = new InMemoryPetRepository();
    orgRepository = new InMemoryOrgRepository();

    sut = new CreatePetUseCase(repository, orgRepository);
  });

  test('creates pet', async () => {
    const OrgData = {
      name: 'Lucas Alves',
      email: 'lucas@mail.com',
      city: 'Goiânia',
      address: 'rua x',
      phone: '99999999',
      password_hash: '123456',
    };

    const org = await orgRepository.create(OrgData);

    const petData = {
      name: 'bigodes',
      type: PetType.CAT,
      age: PetAge.OFFSPRING,
      size: PetSize.MEDIUM,
      energy: PetEnergy.LOW,
      description: 'test',
      org_id: org.id,
    };

    const { pet } = await sut.create(petData);

    expect(pet.id).toEqual(expect.any(String));
  });

  test('cant create pet without org', async () => {
    const petData = {
      name: 'bigodes',
      type: PetType.CAT,
      age: PetAge.OFFSPRING,
      size: PetSize.MEDIUM,
      energy: PetEnergy.LOW,
      description: 'test',
      org_id: 'fake-org-id',
    };

    await expect(async () => {
      await sut.create(petData);
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
