import { app } from '@/app.js';
import { PetAge, PetEnergy, PetSize, PetType } from '@prisma/client';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';

describe('Create Pet e2e', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test('creates pet', async () => {
    const data = {
      name: 'Lucas Alves',
      email: 'lucas@mail.com',
      address: 'rua x',
      phone: '99999999',
      password: '123456',
    };

    await request(app.server).post('/orgs').send(data);

    const authResponse = await request(app.server).post('/orgs/auth').send({
      email: 'lucas@mail.com',
      password: '123456',
    });

    const petData = {
      name: 'bigodes',
      type: PetType.CAT,
      age: PetAge.OFFSPRING,
      size: PetSize.MEDIUM,
      energy: PetEnergy.LOW,
      description: 'test',
      org_id: 'fake-org-id',
    };
    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(petData);

    expect(response.statusCode).toEqual(201);
  });
});
