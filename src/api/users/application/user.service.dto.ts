import { BaseAggregate } from 'src/api/common/base/base-aggregate';
import { IUserId, IUserProperty } from '../../user/domain/user.interface';

export type CreateUserDTO = Omit<IUserProperty, keyof BaseAggregate<IUserId>>;

export type FindOneUserDTO = Pick<IUserProperty, 'id'>;

export type RemoveUserDTO = Pick<IUserProperty, 'id'>;
