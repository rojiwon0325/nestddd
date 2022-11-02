import { AuthServiceDTO } from '@AUTH/application/dto/auth.service.dto';
import { AuthDomain } from '@AUTH/domain/auth.interface';
import { UserDomain } from '@USER/domain/user.interface';
import { UserUsecaseDTO } from '../dto/user.usecase.dto';

export interface IUserUsecase {
  create: (dto: UserUsecaseDTO.Create) => Promise<UserDomain.Public>;
  findOne: (dto: UserUsecaseDTO.FindOne) => Promise<UserDomain.Public>;
  findMe: (auth: AuthDomain.Public) => Promise<UserDomain.PublicDetail>;
  findMany: () => Promise<UserDomain.Public[]>;
  update: (
    auth: AuthDomain.Public,
    dto: UserUsecaseDTO.Update,
  ) => Promise<UserDomain.Public>;
  remove: (
    auth: AuthDomain.Public,
    dto: AuthServiceDTO.Validate,
  ) => Promise<UserUsecaseDTO.RemoveResponse>;
}
