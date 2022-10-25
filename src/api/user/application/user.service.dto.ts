import { BaseAggregate } from 'src/api/common/model/aggregate.base';
import { IUserId, IUserProperty } from '../domain/user.interface';

export type CreateUserDTO = Omit<IUserProperty, keyof BaseAggregate<IUserId>>;

export type FindOneUserDTO = Pick<IUserProperty, 'id'>;

export type RemoveUserDTO = Pick<IUserProperty, 'id'>;
