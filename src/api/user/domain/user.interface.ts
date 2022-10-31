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
  setUsername: (username: string) => void;
}

export type IUser = IUserProperty & IUserMethod;

export type IUserProps = Pick<IUserProperty, 'username'> &
  Partial<Pick<IUserProperty, 'role'> & BaseAggregate<IUserId>>;

export interface StaticUser {
  get: (props: IUserProps) => IUser;
}
