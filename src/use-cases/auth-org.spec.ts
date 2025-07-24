import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-orgs-repository.js';
import { beforeEach, describe, expect, test } from 'vitest';
import { hash } from 'bcryptjs';
import { AuthOrgUseCase } from './auth-org.js';
import { InvalidCredentialsError } from './errors/invalid-credentials-error.js';

let repository: InMemoryOrgRepository;
let sut: AuthOrgUseCase;

describe('Auth Org', () => {
  beforeEach(() => {
    repository = new InMemoryOrgRepository();
    sut = new AuthOrgUseCase(repository);
  });

  test('auths org', async () => {
    const data = {
      name: 'Lucas Alves',
      email: 'lucas@mail.com',
      address: 'rua x',
      phone: '99999999',
      password_hash: await hash('123456', 6),
    };

    await repository.create(data);

    const { org } = await sut.auth({
      email: data.email,
      password: '123456',
    });

    expect(org.id).toEqual(expect.any(String));
    expect(org).toEqual(expect.objectContaining(data));
  });

  test('throws error with auth using wrong email', async () => {
    await expect(async () => {
      await sut.auth({ email: 'lucas@mail.com', password: '123456' });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  test('throws error with auth using wrong password', async () => {
    const data = {
      name: 'Lucas Alves',
      email: 'lucas@mail.com',
      address: 'rua x',
      phone: '99999999',
      password_hash: await hash('123456', 6),
    };

    await repository.create(data);

    await expect(async () => {
      return await sut.auth({
        email: 'lucas@mail.com',
        password: 'wrong-password',
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
