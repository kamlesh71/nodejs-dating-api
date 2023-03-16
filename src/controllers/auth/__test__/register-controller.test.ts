import request from 'supertest';

import { app } from '@/app';
import { URL_BASE_V1 } from '@/constants/path';

const URL_SIGNUP = `${URL_BASE_V1}/auth/signup`;

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post(URL_SIGNUP)
    .send({
      firstName: 'first name',
      lastName: 'last name',
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
});

it('returns a 422 on missing input', async () => {
  await request(app).post(URL_SIGNUP).send({}).expect(422);

  await request(app)
    .post(URL_SIGNUP)
    .send({
      lastName: 'last name',
      email: 'test@test.com',
      password: 'password',
    })
    .expect(422);

  await request(app)
    .post(URL_SIGNUP)
    .send({
      firstName: 'first name',
      email: 'test@test.com',
      password: 'password',
    })
    .expect(422);

  await request(app)
    .post(URL_SIGNUP)
    .send({
      firstName: 'first name',
      lastName: 'last name',
      email: '',
      password: 'password',
    })
    .expect(422);

  await request(app)
    .post(URL_SIGNUP)
    .send({
      firstName: 'first name',
      lastName: 'last name',
      email: 'test@test.com',
      password: '',
    })
    .expect(422);
});

it('disallows duplicate emails', async () => {
  await request(app)
    .post(URL_SIGNUP)
    .send({
      firstName: 'first name',
      lastName: 'last name',
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  return request(app)
    .post(URL_SIGNUP)
    .send({
      firstName: 'first name',
      lastName: 'last name',
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('return a JWT token and user on successful registration', async () => {
  const response = await request(app)
    .post(URL_SIGNUP)
    .send({
      firstName: 'first name',
      lastName: 'last name',
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  expect(response.body.token).toBeDefined();
  expect(response.body.user.email).toEqual('test@test.com');
});
