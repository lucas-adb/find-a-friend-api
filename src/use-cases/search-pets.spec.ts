import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pets-repository.js';
import { beforeEach, describe, expect, test } from 'vitest';
import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-orgs-repository.js';
import { PetAge, PetEnergy, PetSize, PetType } from '@prisma/client';
import { SearchPetUseCase } from './search-pets.js';

let repository: InMemoryPetRepository;
let orgRepository: InMemoryOrgRepository;
let sut: SearchPetUseCase;

describe('Search Pets', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository();
    repository = new InMemoryPetRepository(orgRepository);

    sut = new SearchPetUseCase(repository);
  });

  test('searches pets by city', async () => {
    const OrgDataOne = {
      name: 'Lucas Alves',
      email: 'lucas@mail.com',
      city: 'Goiânia',
      address: 'rua x',
      phone: '99999999',
      password_hash: '123456',
    };

    const orgOne = await orgRepository.create(OrgDataOne);

    const OrgDataTwo = {
      name: 'Lucas Alves',
      email: 'lucas@mail.com',
      city: 'São Paulo',
      address: 'rua x',
      phone: '99999999',
      password_hash: '123456',
    };

    const orgTwo = await orgRepository.create(OrgDataTwo);

    const petDataOne = {
      name: 'bigodes',
      type: PetType.CAT,
      age: PetAge.OFFSPRING,
      size: PetSize.MEDIUM,
      energy: PetEnergy.LOW,
      description: 'test',
      org_id: orgOne.id,
    };

    await repository.create(petDataOne);

    const petDataTwo = {
      name: 'rex',
      type: PetType.DOG,
      age: PetAge.OFFSPRING,
      size: PetSize.MEDIUM,
      energy: PetEnergy.LOW,
      description: 'test',
      org_id: orgTwo.id,
    };

    await repository.create(petDataTwo);

    const { pets } = await sut.search({ city: OrgDataOne.city });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'bigodes',
      }),
    ]);
  });

  test('searches pets by city and type', async () => {
    const OrgDataOne = {
      name: 'Lucas Alves',
      email: 'lucas@mail.com',
      city: 'Goiânia',
      address: 'rua x',
      phone: '99999999',
      password_hash: '123456',
    };

    const orgOne = await orgRepository.create(OrgDataOne);

    const petDataOne = {
      name: 'bigodes',
      type: PetType.CAT,
      age: PetAge.OFFSPRING,
      size: PetSize.MEDIUM,
      energy: PetEnergy.LOW,
      description: 'test',
      org_id: orgOne.id,
    };

    await repository.create(petDataOne);

    const petDataTwo = {
      name: 'rex',
      type: PetType.DOG,
      age: PetAge.OFFSPRING,
      size: PetSize.MEDIUM,
      energy: PetEnergy.LOW,
      description: 'test',
      org_id: orgOne.id,
    };

    await repository.create(petDataTwo);

    const { pets } = await sut.search({ city: OrgDataOne.city, type: 'CAT' });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'bigodes',
      }),
    ]);
  });
});
