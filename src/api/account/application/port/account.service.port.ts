import { Account } from '@ACCOUNT/domain';

export namespace IAccountService {
  export type FindOne =
    | Pick<Account.Property, 'id'>
    | Pick<Account.Property, 'email'>
    | Pick<Account.Property, 'username'>;

  export type CheckPermission = {
    readonly user: Account.Permission;
    readonly permission: Account.Permission;
  };

  export type SignInLocal = Account.Password &
    (Pick<Account.Property, 'email'> | Pick<Account.Property, 'username'>);

  export type CheckDupliacte =
    | Pick<Account.Property, 'username'>
    | Pick<Account.Property, 'email'>;

  export type CheckPassword = Account.Password & { hashed: string };
}

export interface IAccountService {
  readonly findOne: (
    where: IAccountService.FindOne,
  ) => Promise<Account.Property>;
  readonly signInLocal: (
    dto: IAccountService.SignInLocal,
  ) => Promise<Account.Property>;
  readonly checkPermission: (dto: IAccountService.CheckPermission) => void;
  readonly checkDuplicate: (
    dto: IAccountService.CheckDupliacte,
  ) => Promise<void>;
  readonly checkPassword: (dto: IAccountService.CheckPassword) => Promise<void>;
}
