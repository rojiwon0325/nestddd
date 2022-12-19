import { User } from '@USER/domain';

export namespace IUserUsecase {
  export type SetRoleBody = Pick<User.State, 'permission'>;
}
export interface IUserUsecase {
  readonly me: (profile: User.Profile) => Promise<User.Public>;
  readonly setRole: (
    filter: Pick<User.State, 'id'>,
    data: Pick<User.State, 'permission'>,
  ) => Promise<void>;
}

export const IUserUsecase = Symbol('UserUsecase');
