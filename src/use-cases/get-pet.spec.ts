import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pets-repository.js';
import { beforeEach, describe, expect, test } from 'vitest';
import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-orgs-repository.js';
import { PetAge, PetEnergy, PetSize, PetType } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error.js';
import { GetPetUseCase } from './get-pet.js';

let repository: InMemoryPetRepository;
let orgRepository: InMemoryOrgRepository;
let sut: GetPetUseCase;

describe('Create Pet', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository();
    repository = new InMemoryPetRepository(orgRepository);

    sut = new GetPetUseCase(repository);
  });

  test('gets pet', async () => {
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

    const petCreated = await repository.create(petData);

    const { pet } = await sut.get({ id: petCreated.id });

    expect(pet.id).toEqual(expect.any(String));
  });

  test('cant get pet that does not exists', async () => {
    await expect(async () => {
      await sut.get({ id: 'fake-pet-id' });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
