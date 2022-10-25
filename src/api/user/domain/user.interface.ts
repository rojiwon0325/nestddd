import { BaseAggregate } from 'src/api/common/model/aggregate.base';

export type IUserId = number;

export type IUserResponse = Pick<IUserProperty, 'id' | 'username'>;

export interface IUserProperty extends BaseAggregate<IUserId> {
  username: string;
}

export type IUserMethod = {
  getResponse: () => IUserResponse;
};

export type IUser = IUserProperty & IUserMethod;

export type IUserProps = Omit<IUserProperty, keyof BaseAggregate<IUserId>> &
  Partial<BaseAggregate<IUserId>>;
