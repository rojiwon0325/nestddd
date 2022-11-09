import { Auth } from '@AUTH/domain';

export namespace IAuthRepository {
  export type FindOne = Pick<Auth.State, 'id'> | Pick<Auth.State, 'email'>;
}

export interface IAuthRepository {
  readonly findOne: (
    where: IAuthRepository.FindOne,
  ) => Promise<Auth.State | null>;
}
