import { User } from '@USER/domain';

export namespace IUserUsecase {
  export type FindOne = Pick<User.State, 'id'>;
  export type Create = Pick<User.State, 'email' | 'username' | 'password'>;
  export type Update = Partial<Pick<User.State, 'username'>> &
    Pick<User.MetadataVO, 'bio' | 'birth' | 'phone'>;
}

export interface IUserUsecase {
  readonly findOne: (where: IUserUsecase.FindOne) => Promise<User.Profile>;
  readonly findMe: (where: IUserUsecase.FindOne) => Promise<User.ProfileDetail>;
  readonly create: (where: IUserUsecase.Create) => Promise<User.ProfileDetail>;
  readonly update: (
    where: IUserUsecase.FindOne,
    update: IUserUsecase.Update,
  ) => Promise<User.ProfileDetail>;
  readonly remove: (where: IUserUsecase.FindOne) => Promise<void>;
}
