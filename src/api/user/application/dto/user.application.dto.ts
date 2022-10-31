import { IUserProperty } from '../../domain/user.interface';

export type CreateUserDTO = Pick<IUserProperty, 'username'>;

export type FindOneUserDTO = Pick<IUserProperty, 'id'>;

export type UpdateUserDTO = Partial<Pick<IUserProperty, 'username'>>;

export type UpdateUserRoleDTO = Pick<IUserProperty, 'role'>;

export type RemoveUserDTO = Pick<IUserProperty, 'id'>;
