import * as bcrypt from 'bcrypt';

export interface Crypto {
  readonly encrypt: (arg: string) => Promise<string>;
  readonly compare: (str: string, hashed: string) => Promise<boolean>;
}

export const Crypto: Crypto = {
  encrypt(arg) {
    return bcrypt.hash(arg, 10);
  },
  compare(str, hashed) {
    return bcrypt.compare(str, hashed);
  },
};
