import { Auth } from '@AUTH/domain';
import { CookieOptions } from 'express';

export namespace IAuthUsecase {
  export type SignIn = Pick<Auth.State, 'email' | 'password'>;
  export type SignInResponse = readonly [string, string, CookieOptions];
}

export interface IAuthUsecase {
  readonly signIn: (
    dto: IAuthUsecase.SignIn,
  ) => Promise<IAuthUsecase.SignInResponse>;
}
