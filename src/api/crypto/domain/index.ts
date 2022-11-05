import * as bcrypt from 'bcrypt';

export namespace Crypto {
  export interface Method {
    readonly encrypt: (arg: string) => Promise<string>;
    readonly compare: (str: string, hashed: string) => Promise<boolean>;
  }
}

export const Crypto: Crypto.Method = {
  encrypt(arg) {
    return bcrypt.hash(arg, 10);
  },
  compare(str, hashed) {
    return bcrypt.compare(str, hashed);
  },
};
