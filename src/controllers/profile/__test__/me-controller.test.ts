import request from 'supertest';
import { URL_BASE_V1 } from '@/constants/path';
import { app } from '@/app';
import { signin } from '@/test/helpers';

const ME_URL = `${URL_BASE_V1}/profile/me`;

it('return 401 when without bearer token', async () => {
  return request(app).get(ME_URL).expect(401);
});

it('return 201 with user when request with valid token', async () => {
  const token = await signin();
  return request(app)
    .get(ME_URL)
    .set('authorization', token)
    .expect(200)
    .then((response) => {
      expect(response.body.firstName).toEqual('kamlesh');
      expect(response.body.lastName).toEqual('suthar');
      expect(response.body.email).toEqual('kamlesh@gmail.com');
    });
});

it('returns 401 when invalid token supplied', async () => {
  await request(app).get(ME_URL).set('authorization', 'abc').expect(401);
  await request(app).get(ME_URL).set('authorization', 'Bearer abc').expect(401);
  await request(app).get(ME_URL).set('authorization', 'Bearer ').expect(401);
});
