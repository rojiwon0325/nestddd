import { IBaseRepository } from 'src/api/common/interface/base-repository.interface';
import { IUser, IUserId, IUserProperty } from '../../domain/user.interface';

export interface IUserRepository extends IBaseRepository<IUserId, IUser> {
  findOne: (
    where: Pick<IUserProperty, 'id'> | Pick<IUserProperty, 'username'>,
  ) => Promise<IUser | null>;
  save: (aggregate: IUser, password?: string) => Promise<IUser>;
}
