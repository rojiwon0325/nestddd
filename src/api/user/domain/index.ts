import { IBaseAggregate } from '@COMMON/interface';

export namespace User {
  export type Id = number;

  export type Permission = 'Admin' | 'Manager' | 'Normal';

  export interface State extends IBaseAggregate<Id> {
    /**
     * @format email
     */
    readonly email: string;
    readonly username: string;
    readonly permission: Permission;
  }

  export type Profile = Pick<State, 'id' | 'username' | 'email'>;

  export type Public = Pick<
    User.State,
    'id' | 'email' | 'username' | 'permission'
  >;
}

type Required = keyof Pick<User.State, 'username' | 'email' | 'permission'>;
type GetArgs = Pick<User.State, Required> & Partial<Omit<User.State, Required>>;

export interface User {
  readonly get: (args: GetArgs) => User.State;
  readonly getPublic: (args: User.State) => User.Public;
}

type CheckPermissionArgs = { user: User.Permission; target: User.Permission };

export interface User {
  readonly checkPermission: (args: CheckPermissionArgs) => boolean;
}

const permissionLevel: { [key in User.Permission]: number } = {
  Admin: 0,
  Manager: 1,
  Normal: 2,
};

export const User: User = {
  get(args) {
    const now = new Date();
    const {
      username,
      email,
      permission,
      id = 0,
      created_at = now,
      updated_at = now,
    } = args;
    return { id, created_at, updated_at, username, email, permission };
  },
  getPublic(args) {
    const { id, email, username, permission } = args;
    return { id, email, username, permission };
  },
  checkPermission({ user, target }) {
    const ulevel = permissionLevel[user];
    const tlevel = permissionLevel[target];
    return ulevel <= tlevel;
  },
};
