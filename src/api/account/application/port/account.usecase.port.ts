import { Account } from '@ACCOUNT/domain';
import { CookieOptions } from 'express';

export namespace IAccountUsecase {
  export type SignIn = Account.Password &
    (Pick<Account.Property, 'email'> | Pick<Account.Property, 'username'>);

  export type SignInResponse = readonly [string, string, CookieOptions];

  export type SignUp = Account.Password &
    Pick<Account.Property, 'username' | 'email'>;

  export type RemoveResponse = Account.Public;
}

export interface IAccountUsecase {
  readonly signIn: (
    dto: IAccountUsecase.SignIn,
  ) => Promise<IAccountUsecase.SignInResponse>;
  readonly signUp: (dto: IAccountUsecase.SignUp) => Promise<Account.Public>;

  readonly remove: (
    where: Account.Public,
    validate: IAccountUsecase.SignIn,
  ) => Promise<IAccountUsecase.RemoveResponse>;
}
