import { ValidateAuthDTO } from 'src/api/auth/application/dto/auth.application.dto';
import { IUserProperty } from '../../domain/user.interface';

export type CreateUserDTO = Pick<ValidateAuthDTO, 'username' | 'password'>;

export type FindOneUserDTO =
  | Pick<IUserProperty, 'id'>
  | Pick<IUserProperty, 'username'>;

export type UpdateUserDTO = Partial<Pick<IUserProperty, 'username'>>;

export type RemoveUserResponse = Pick<IUserProperty, 'id'>;
