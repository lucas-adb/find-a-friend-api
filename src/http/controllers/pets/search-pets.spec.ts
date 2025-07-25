import { app } from '@/app.js';
import { prisma } from '@/lib/prisma.js';
import { PetAge, PetEnergy, PetSize, PetType } from '@prisma/client';
import { hash } from 'bcryptjs';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';

describe('Search Pets e2e', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test('gets pet by city', async () => {
    const dataOne = {
      name: 'Lucas Alves',
      email: 'lucas@mail.com',
      city: 'Goiânia',
      address: 'rua x',
      phone: '99999999',
      password_hash: await hash('123456', 6),
    };

    const dataTwo = {
      name: 'Ze',
      email: 'ze@mail.com',
      city: 'São Paulo',
      address: 'rua x',
      phone: '99999999',
      password_hash: await hash('123456', 6),
    };

    const orgOne = await prisma.org.create({ data: dataOne });
    const orgTwo = await prisma.org.create({ data: dataTwo });

    const authResponse = await request(app.server).post('/orgs/auth').send({
      email: 'lucas@mail.com',
      password: '123456',
    });

    const petDataOne = {
      name: 'bigodes',
      type: PetType.CAT,
      age: PetAge.OFFSPRING,
      size: PetSize.MEDIUM,
      energy: PetEnergy.LOW,
      description: 'test',
      org_id: orgOne.id,
    };

    const petDataTwo = {
      name: 'rex',
      type: PetType.DOG,
      age: PetAge.OFFSPRING,
      size: PetSize.MEDIUM,
      energy: PetEnergy.LOW,
      description: 'test',
      org_id: orgTwo.id,
    };

    await prisma.pet.create({ data: petDataOne });
    await prisma.pet.create({ data: petDataTwo });

    const response = await request(app.server)
      .get(`/pets`)
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .query({ city: orgOne.city });

    console.log(response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'bigodes',
      })
    ]);
  });

  test('gets pet by city and type', async () => {
    const dataOne = {
      name: 'Lucas Alves',
      email: 'lucas2@mail.com',
      city: 'Goiânia',
      address: 'rua x',
      phone: '99999999',
      password_hash: await hash('123456', 6),
    };

    const orgOne = await prisma.org.create({ data: dataOne });

    const authResponse = await request(app.server).post('/orgs/auth').send({
      email: 'lucas@mail.com',
      password: '123456',
    });

    const petDataOne = {
      name: 'bigodes',
      type: PetType.CAT,
      age: PetAge.OFFSPRING,
      size: PetSize.MEDIUM,
      energy: PetEnergy.LOW,
      description: 'test',
      org_id: orgOne.id,
    };

    const petDataTwo = {
      name: 'rex',
      type: PetType.DOG,
      age: PetAge.OFFSPRING,
      size: PetSize.MEDIUM,
      energy: PetEnergy.LOW,
      description: 'test',
      org_id: orgOne.id,
    };

    await prisma.pet.create({ data: petDataOne });
    await prisma.pet.create({ data: petDataTwo });

    const response = await request(app.server)
      .get(`/pets`)
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .query({ city: orgOne.city, type: 'DOG' });

    console.log(response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'rex',
      })
    ]);
  });
});
