import { CookieOptions } from 'express';
import { BaseAggregate } from 'src/api/common/base/base-aggregate';
import { UserRole } from 'src/api/user/domain/user.enum';

export type IAuthId = number;

export interface IAuthProperty extends BaseAggregate<IAuthId> {
  readonly username: string;
  readonly password: string;
  readonly role: UserRole;
}

export type IAuthResponse = Pick<IAuthProperty, 'id' | 'username' | 'role'>;

export interface IAuthMethod {
  getResponse: () => IAuthResponse;
}

export type IAuth = IAuthProperty & IAuthMethod;

export type IAuthProps = Omit<IAuthProperty, keyof BaseAggregate<IAuthId>> &
  Partial<BaseAggregate<IAuthId>>;

export interface StaticAuth {
  get: (props: IAuthProps) => IAuth;
  authenticate: (password: string, hashed_password: string) => Promise<boolean>;
  checkPermission: (user: UserRole, permission: UserRole) => boolean;
  getCookieName: () => string;
  getCookieConfig: () => CookieOptions;
}
