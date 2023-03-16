import { UserDoc } from './models/user';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  GAY = 'gay',
  LESBIAN = 'lesbian',
  OTHER = 'other',
}

export enum SexualOrientation {
  STRAIGHT = 'straight',
}

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      JWT_KEY: string;
      MONGO_URL: string;
    }
  }

  namespace Express {
    export interface Request {
      user: UserDoc;
    }
  }
}
