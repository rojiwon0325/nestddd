import { IBaseRepository } from '@COMMON/interface/base-repository.interface';
import { UserDomain } from '@USER/domain/user.interface';

export interface IUserRepository
  extends IBaseRepository<UserDomain.Id, UserDomain.Aggregate> {
  findOne: (
    where:
      | Pick<UserDomain.Property, 'id'>
      | Pick<UserDomain.Property, 'username'>,
  ) => Promise<UserDomain.Aggregate | null>;
  save: (
    aggregate: UserDomain.Aggregate,
    password?: string,
  ) => Promise<UserDomain.Aggregate>;
}
