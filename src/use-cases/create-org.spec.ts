import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-orgs-repository.js';
import { beforeEach, describe, expect, test } from 'vitest';
import { CreateOrgUseCase } from './create-org.js';
import { compare } from 'bcryptjs';
import { OrgAlreadyExistsError } from './errors/org-already-exists-error.js';

let repository: InMemoryOrgRepository;
let sut: CreateOrgUseCase;

describe('Create Org', () => {
  beforeEach(() => {
    repository = new InMemoryOrgRepository();
    sut = new CreateOrgUseCase(repository);
  });

  test('creates org', async () => {
    const data = {
      name: 'Lucas Alves',
      email: 'lucas@mail.com',
      city: 'Goiânia',
      address: 'rua x',
      phone: '99999999',
      password: '123456',
    };

    const { org } = await sut.create(data);

    expect(org.id).toEqual(expect.any(String));
  });

  test('hashes password', async () => {
    const data = {
      name: 'Lucas Alves',
      email: 'lucas@mail.com',
      city: 'Goiânia',
      address: 'rua x',
      phone: '99999999',
      password: '123456',
    };

    const { org } = await sut.create(data);

    const isPasswordHashed = await compare('123456', org.password_hash);

    expect(isPasswordHashed).toBe(true);
  });

  test('cant create two orgs with same email', async () => {
    const data = {
      name: 'Lucas Alves',
      email: 'lucas@mail.com',
      city: 'Goiânia',
      address: 'rua x',
      phone: '99999999',
      password: '123456',
    };

    await sut.create(data);

    await expect(async () => {
      await sut.create(data);
    }).rejects.toBeInstanceOf(OrgAlreadyExistsError);
  });
});
