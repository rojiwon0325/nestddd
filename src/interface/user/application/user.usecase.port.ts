import { IUserAggregate } from '../domain';

export namespace IUserUsecase {}

export interface IUserUsecase {
  readonly me: (
    profile: IUserAggregate.Profile,
  ) => Promise<IUserAggregate.Public>;
  readonly setRole: (
    profile: IUserAggregate.Profile,
    data: Pick<IUserAggregate.State, 'role'>,
  ) => Promise<void>;
  readonly remove: (profile: IUserAggregate.Profile) => Promise<void>;
}

export const IUserUsecase = Symbol('UserUsecase');
