import { Account } from '@ACCOUNT/domain';
import { User } from '@USER/domain';

export namespace IUserUsecase {
  /** user id가 아닌 account id임을 명심하라 */
  export type FindOne =
    | Pick<User.AccountEntity, 'id'>
    | Pick<User.AccountEntity, 'username'>;

  export type FindMe = FindOne | Pick<User.AccountEntity, 'email'>;

  export type CreateProfile = User.ProfileEntity;

  export type UpdateProfile = Partial<User.ProfileEntity>;

  /** 민감한 정보의 변경은 usecase를 분리한다. */
  export type UpdatePassword = Account.Password;

  export type UpdateUsername = Pick<User.AccountEntity, 'username'>;
}

export interface IUserUsecase {
  readonly findOne: (where: IUserUsecase.FindOne) => Promise<User.Public>;
  readonly findMe: (where: IUserUsecase.FindMe) => Promise<User.PublicDetail>;
  readonly createProfile: (
    where: IUserUsecase.FindMe,
    update: IUserUsecase.CreateProfile,
  ) => Promise<User.PublicDetail>;
  readonly updateProfile: (
    where: IUserUsecase.FindMe,
    update: IUserUsecase.UpdateProfile,
  ) => Promise<User.PublicDetail>;
  readonly updateUsername: (
    where: IUserUsecase.FindMe,
    update: IUserUsecase.UpdateUsername,
  ) => Promise<User.PublicDetail>;
}
