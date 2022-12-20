import { User } from '@USER/domain';

export namespace IUserRepository {
  export type UpdateData = Partial<Pick<User.State, 'role'>>;
}

export interface IUserRepository {
  readonly findOne: (profile: User.Profile) => Promise<User.State | null>;
  readonly save: (state: User.State) => Promise<User.State>;
  readonly update: (
    filter: Pick<User.State, 'id'>,
    data: IUserRepository.UpdateData,
  ) => Promise<void>;
  readonly remove: (filter: Pick<User.State, 'id'>) => Promise<void>;
}

export const IUserRepository = Symbol('UserRepository');
