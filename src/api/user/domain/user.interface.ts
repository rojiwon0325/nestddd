import { BaseAggregate } from 'src/api/common/base/base-aggregate';
import { UserRole } from './user.enum';

export type IUserId = number;

export interface IUserProperty extends BaseAggregate<IUserId> {
  readonly username: string;
  readonly role: UserRole;
}

export type IUserResponse = Pick<IUserProperty, 'id' | 'username' | 'role'>;

export interface IUserMethod {
  getResponse: () => IUserResponse;
}

export type IUser = IUserProperty & IUserMethod;

export type IUserProps = Omit<IUserProperty, keyof BaseAggregate<IUserId>> &
  Partial<BaseAggregate<IUserId>>;

export interface StaticUser {
  get: (props: IUserProps) => IUser;
}
