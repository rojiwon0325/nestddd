import { User } from '@USER/domain';

export namespace IUserUsecase {
  export type SetRoleBody = Pick<User.State, 'role'>;
}
export interface IUserUsecase {
  readonly me: (profile: User.Profile) => Promise<User.Public>;
  readonly setRole: (
    profile: User.Profile,
    data: Pick<User.State, 'role'>,
  ) => Promise<void>;
  readonly remove: (profile: User.Profile) => Promise<void>;
}

export const IUserUsecase = Symbol('UserUsecase');
