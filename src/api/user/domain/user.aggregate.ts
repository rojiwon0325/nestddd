import { BaseAggregate } from '@COMMON/base/base-aggregate';
import { UserRole } from './user.enum';
import { UserDomain } from './user.interface';

export class User
  extends BaseAggregate<UserDomain.Id>
  implements UserDomain.Static<typeof User>
{
  private constructor(
    id: UserDomain.Id,
    created_at: Date,
    updated_at: Date,
    readonly username: string,
    readonly role: UserRole,
  ) {
    super(id, created_at, updated_at);
  }

  static get(props: UserDomain.Props): UserDomain.Aggregate {
    const { id, created_at, updated_at, username, role } = props;
    const now = new Date();
    return new User(
      id ?? 0,
      created_at ?? now,
      updated_at ?? now,
      username,
      role ?? UserRole.Normal,
    );
  }

  getPublic(): UserDomain.Public {
    const { id, username, role } = this;
    return { id, username, role };
  }

  getPublicDetail(): UserDomain.PublicDetail {
    const { id, username, role } = this;
    return { id, username, role };
  }

  setUsername(username: string): void {
    (this as any).username = username;
    return;
  }
}
