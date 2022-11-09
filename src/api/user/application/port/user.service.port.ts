import { User } from '@USER/domain';

export namespace IUserService {
  export type FindOne = Pick<User.State, 'id'>;
}

export interface IUserService {
  readonly findOne: (where: IUserService.FindOne) => Promise<User.State>;
}
