import { ValidateAuthDTO } from 'src/api/auth/application/dto/auth.application.dto';
import { IAuthResponse } from 'src/api/auth/domain/auth.interface';
import { IUserResponse } from '../../domain/user.interface';
import {
  CreateUserDTO,
  FindOneUserDTO,
  RemoveUserResponse,
  UpdateUserDTO,
} from '../dto/user.application.dto';

export interface IUserUsecase {
  create: (dto: CreateUserDTO) => Promise<IUserResponse>;
  findOne: (dto: FindOneUserDTO) => Promise<IUserResponse>;
  findMe: (auth: IAuthResponse) => Promise<IUserResponse>;
  findMany: () => Promise<IUserResponse[]>;
  update: (auth: IAuthResponse, dto: UpdateUserDTO) => Promise<IUserResponse>;
  remove: (
    auth: IAuthResponse,
    dto: ValidateAuthDTO,
  ) => Promise<RemoveUserResponse>;
}
