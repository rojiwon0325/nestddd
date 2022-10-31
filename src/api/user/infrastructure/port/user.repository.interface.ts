import { IBaseRepository } from 'src/api/common/interface/base-repository.interface';
import { IUser, IUserId } from '../../domain/user.interface';

export type IUserRepository = IBaseRepository<IUserId, IUser>;
