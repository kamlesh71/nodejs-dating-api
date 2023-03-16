import request from 'supertest';
import { app } from '@/app';
import { URL_BASE_V1 } from '@/constants/path';

const URL_SIGNUP = `${URL_BASE_V1}/auth/signup`;
const URL_SIGNIN = `${URL_BASE_V1}/auth/signin`;

it('return 422 on empty values', async () => {
  await request(app).post(URL_SIGNIN).send({}).expect(422);
  await request(app)
    .post(URL_SIGNIN)
    .send({ email: 'test@test.com' })
    .expect(422);
  await request(app)
    .post(URL_SIGNIN)
    .send({
      password: 'password',
    })
    .expect(422);
});

it('success when correct credetails are supplied', async () => {
  await request(app)
    .post(URL_SIGNUP)
    .send({
      firstName: 'kamlesh',
      lastName: 'suthar',
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  return request(app)
    .post(URL_SIGNIN)
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(200);
});

it('fails when incorrect credentails are supplied', async () => {
  return request(app)
    .post(URL_SIGNIN)
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(401);
});
