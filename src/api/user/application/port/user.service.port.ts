import { User } from '@USER/domain';

export namespace IUserService {
  export type FindOne =
    | Pick<User.AccountEntity, 'id'>
    | Pick<User.AccountEntity, 'email'>
    | Pick<User.AccountEntity, 'username'>;
}

export interface IUserService {
  readonly findOne: (where: IUserService.FindOne) => Promise<User.Property>;
}
