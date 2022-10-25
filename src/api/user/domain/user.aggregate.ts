import { BaseAggregate } from 'src/api/common/model/aggregate.base';
import { IUser, IUserId, IUserProps, IUserResponse } from './user.interface';

export class User extends BaseAggregate<IUserId> implements IUser {
  private constructor(
    id: IUserId,
    readonly username: string,
    created_at: Date,
    updated_at: Date,
  ) {
    super(id, created_at, updated_at);
  }

  static get(props: IUserProps): IUser {
    const { id, username, created_at, updated_at } = props;
    const now = new Date();
    return new User(id ?? 0, username, created_at ?? now, updated_at ?? now);
  }

  getResponse(): IUserResponse {
    const { id, username } = this;
    return { id, username };
  }
}
