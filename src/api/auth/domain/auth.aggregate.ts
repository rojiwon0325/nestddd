import { BaseAggregate } from '@COMMON/base/base-aggregate';
import { RoleLevel, UserRole } from '@USER/domain/user.enum';
import * as bcrypt from 'bcrypt';
import { AuthDomain } from './auth.interface';

export class Auth
  extends BaseAggregate<AuthDomain.Id>
  implements AuthDomain.Static<typeof Auth>
{
  private constructor(
    id: AuthDomain.Id,
    created_at: Date,
    updated_at: Date,
    readonly username: string,
    readonly password: string,
    readonly role: UserRole,
  ) {
    super(id, created_at, updated_at);
  }

  getPublic(): AuthDomain.Public {
    const { id, username, role } = this;
    return { id, username, role };
  }

  static get(props: AuthDomain.Props): AuthDomain.Aggregate {
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

  static authenticate({
    password,
    hashed,
  }: AuthDomain.AuthenticateArgs): Promise<boolean> {
    return bcrypt.compare(password, hashed);
  }

  static checkPermission({
    user,
    permission,
  }: AuthDomain.CheckPermissionArgs): boolean {
    const userLevel = RoleLevel[user];
    const permLevel = RoleLevel[permission];
    return userLevel <= permLevel;
  }
}
