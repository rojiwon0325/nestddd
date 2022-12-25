import { IBaseAggregate } from '@INTERFACE/common';

export namespace IUserAggregate {
  export type Id = number;
  export type Permission = 'Admin' | 'Manager' | 'Normal';
  export interface State extends IBaseAggregate<Id> {
    /**
     * @format email
     */
    readonly email: string;
    readonly username: string;
    readonly role: Permission;
  }
  export type Profile = Pick<State, 'id' | 'username' | 'email'>;

  export type Public = Pick<
    IUserAggregate.State,
    'id' | 'email' | 'username' | 'role'
  >;
}

type Required = keyof Pick<IUserAggregate.State, 'id' | 'username' | 'email'>;
type GetArgs = Pick<IUserAggregate.State, Required> &
  Partial<Omit<IUserAggregate.State, Required>>;

export interface IUserAggregate {
  readonly get: (args: GetArgs) => IUserAggregate.State;
  readonly getPublic: (args: IUserAggregate.State) => IUserAggregate.Public;
  readonly setRole: (
    agg: IUserAggregate.State,
    role: IUserAggregate.Permission,
  ) => IUserAggregate.State;
}

type CheckPermissionArgs = {
  user: IUserAggregate.Permission;
  target: IUserAggregate.Permission;
};

export interface IUserAggregate {
  readonly checkPermission: (args: CheckPermissionArgs) => boolean;
}
