import request from 'supertest';
import { app } from '@/app';

import { URL_BASE_V1 } from '@/constants/path';

const URL_SIGNUP = `${URL_BASE_V1}/auth/signup`;

export const signin = async () => {
  const response = await request(app).post(URL_SIGNUP).send({
    firstName: 'kamlesh',
    lastName: 'suthar',
    email: 'kamlesh@gmail.com',
    password: '123456',
  });

  return `Bearer ${response.body.token as string}`;
};
