import * as bcrypt from 'bcrypt';
import { CookieOptions } from 'express';
import { BaseAggregate } from 'src/api/common/base/base-aggregate';
import { Implements } from 'src/api/common/interface/class.interface';
import { RoleLevel, UserRole } from 'src/api/user/domain/user.enum';
import {
  IAuth,
  IAuthId,
  IAuthProps,
  IAuthResponse,
  StaticAuth,
} from './auth.interface';

export class Auth
  extends BaseAggregate<IAuthId>
  implements Implements<IAuth, StaticAuth, typeof Auth>
{
  private constructor(
    id: IAuthId,
    created_at: Date,
    updated_at: Date,
    readonly username: string,
    readonly password: string,
    readonly role: UserRole,
  ) {
    super(id, created_at, updated_at);
  }

  static get(props: IAuthProps): IAuth {
    const { id, created_at, updated_at, username, password, role } = props;
    const now = new Date();
    return new Auth(
      id ?? 0,
      created_at ?? now,
      updated_at ?? now,
      username,
      password,
      role,
    );
  }

  static authenticate(password: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(password, hashed);
  }

  static getCookieName(): string {
    return 'access_token';
  }

  static getCookieConfig(): CookieOptions {
    const option: CookieOptions = {};
    return option;
  }

  static checkPermission(user: UserRole, permission: UserRole): boolean {
    const userLevel = RoleLevel[user];
    const permLevel = RoleLevel[permission];
    return userLevel <= permLevel;
  }

  getResponse(): IAuthResponse {
    const { id, username, role } = this;
    return { id, username, role };
  }
}
