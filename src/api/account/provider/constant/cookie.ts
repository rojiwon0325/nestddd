import { CookieOptions } from 'express';

type ICookie = {
  option: CookieOptions;
  name: string;
};

export const Cookie: ICookie = {
  option: {},
  name: 'access_token',
};
