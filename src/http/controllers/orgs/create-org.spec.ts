import { app } from '@/app.js';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';

describe('Create Org e2e', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test('creates org', async () => {
    const data = {
      name: 'Lucas Alves',
      email: 'lucas@mail.com',
      address: 'rua x',
      phone: '99999999',
      password: '123456',
    };

    const response = await request(app.server).post('/orgs').send(data);

    expect(response.statusCode).toEqual(201);
  });
});
