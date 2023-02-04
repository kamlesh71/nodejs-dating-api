import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Hash {
  static async make(plainText: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(plainText, salt, 64)) as Buffer;

    return `${buf.toString('hex')}.${salt}`;
  }

  static async compare(hashedText: string, plainText: string) {
    const [hashed, salt] = hashedText.split('.');
    const buf = (await scryptAsync(plainText, salt, 64)) as Buffer;

    return hashed === buf.toString('hex');
  }
}
