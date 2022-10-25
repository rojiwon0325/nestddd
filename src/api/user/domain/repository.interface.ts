import { IBaseRepository } from 'src/api/common/interface/repository.interface';
import { IUser, IUserId } from './user.interface';

export type IUserRepository = IBaseRepository<IUserId, IUser>;
