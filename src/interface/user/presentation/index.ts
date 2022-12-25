import { IUserAggregate } from '../domain';

export namespace IUserController {
  export type SetRoleBody = Pick<IUserAggregate.State, 'role'>;
}
