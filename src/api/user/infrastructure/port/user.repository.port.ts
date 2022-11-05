import { IBaseAggregate } from '@COMMON/interface/base-aggregate.interface';
import { Account } from '@ACCOUNT/domain';
import { IAccountRepository } from '@ACCOUNT/infrastructure/port/account.repository.port';
import { IBaseRepository } from '@COMMON/interface/base-repository.interface';
import { User } from '@USER/domain';

export namespace IUserRepository {
  export type FindOne =
    | Pick<User.Property, 'id'>
    | {
        account:
          | Pick<User.AccountEntity, 'id'>
          | Pick<User.AccountEntity, 'email'>
          | Pick<User.AccountEntity, 'username'>;
      };

  export interface Entity extends IBaseAggregate<User.Id> {
    /** 인물 소개 정보 */
    bio: string;

    account_id: Account.Id;

    account: IAccountRepository.Entity;
  }
}

export interface IUserRepository
  extends IBaseRepository<User.Id, User.Property> {
  findOne: (where: IUserRepository.FindOne) => Promise<User.Property | null>;
}
