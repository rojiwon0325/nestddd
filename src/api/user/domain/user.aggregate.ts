import { BaseAggregate } from 'src/api/common/base/base-aggregate';
import { Implements } from 'src/api/common/interface/class.interface';
import { UserRole } from './user.enum';
import {
  IUser,
  IUserId,
  IUserProps,
  IUserResponse,
  StaticUser,
} from './user.interface';

export class User
  extends BaseAggregate<IUserId>
  implements Implements<IUser, StaticUser, typeof User>
{
  private constructor(
    id: IUserId,
    created_at: Date,
    updated_at: Date,
    readonly username: string,
    readonly role: UserRole,
  ) {
    super(id, created_at, updated_at);
  }

  static get(props: IUserProps): IUser {
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

  getResponse(): IUserResponse {
    const { id, username, role } = this;
    return { id, username, role };
  }

  setUsername(username: string): void {
    (this as any).username = username;
    return;
  }
}
