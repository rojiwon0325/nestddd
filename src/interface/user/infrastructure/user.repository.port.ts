import { IUserAggregate } from '../domain';

export namespace IUserRepository {
  export type UpdateData = Partial<Pick<IUserAggregate.State, 'role'>>;
}

export interface IUserRepository {
  readonly findOne: (
    profile: IUserAggregate.Profile,
  ) => Promise<IUserAggregate.State | null>;
  readonly save: (state: IUserAggregate.State) => Promise<IUserAggregate.State>;
  readonly update: (
    filter: Pick<IUserAggregate.State, 'id'>,
    data: IUserRepository.UpdateData,
  ) => Promise<void>;
  readonly remove: (filter: Pick<IUserAggregate.State, 'id'>) => Promise<void>;
}

export const IUserRepository = Symbol('UserRepository');
