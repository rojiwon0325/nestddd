import { IServicePromise } from 'src/api/common/interface/service.interface';
import { IUser } from '../../domain/user.interface';

export type IUserCreateUsecase = IServicePromise<[], IUser>;
