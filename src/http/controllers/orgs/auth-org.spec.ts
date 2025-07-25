import { app } from '@/app.js';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';

describe('Auth Org e2e', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test('auth org', async () => {
    const data = {
      name: 'Lucas Alves',
      email: 'lucas@mail.com',
      city: 'Goiânia',
      address: 'rua x',
      phone: '99999999',
      password: '123456',
    };

    await request(app.server).post('/orgs').send(data);

    const authResponse = await request(app.server)
      .post('/orgs/auth')
      .send({ email: 'lucas@mail.com', password: '123456' });

    expect(authResponse.statusCode).toEqual(200);

    expect(authResponse.body).toEqual({
      token: expect.any(String),
    });
  });
});
