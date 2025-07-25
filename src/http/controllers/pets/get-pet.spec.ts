import { app } from '@/app.js';
import { prisma } from '@/lib/prisma.js';
import { PetAge, PetEnergy, PetSize, PetType } from '@prisma/client';
import { hash } from 'bcryptjs';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';

describe('Create Pet e2e', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test('gets pet', async () => {
    const data = {
      name: 'Lucas Alves',
      email: 'lucas@mail.com',
      address: 'rua x',
      phone: '99999999',
      password_hash: await hash('123456', 6),
    };

    const org = await prisma.org.create({ data });

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
      org_id: org.id,
    };

    const pet = await prisma.pet.create({ data: petData });

    const response = await request(app.server)
      .get(`/pets/${pet.id}`)
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(petData);

    expect(response.statusCode).toBe(200);
    expect(response.body.pet.name).toBe('bigodes');
  });
});
