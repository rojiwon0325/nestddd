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
    readonly role: Permission;
  }

  export type Profile = Pick<State, 'id' | 'username' | 'email'>;

  export type Public = Pick<User.State, 'id' | 'email' | 'username' | 'role'>;
}

type Required = keyof Pick<User.State, 'id' | 'username' | 'email'>;
type GetArgs = Pick<User.State, Required> & Partial<Omit<User.State, Required>>;

export interface User {
  readonly get: (args: GetArgs) => User.State;
  readonly getPublic: (args: User.State) => User.Public;
  readonly setRole: (agg: User.State, role: User.Permission) => User.State;
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
      role = 'Normal',
      id,
      created_at = now,
      updated_at = now,
    } = args;
    return { id, created_at, updated_at, username, email, role };
  },
  getPublic(args) {
    const { id, email, username, role } = args;
    return { id, email, username, role };
  },
  setRole(agg, role) {
    (agg as any).role = role;
    return agg;
  },
  checkPermission({ user, target }) {
    const ulevel = permissionLevel[user];
    const tlevel = permissionLevel[target];
    return ulevel <= tlevel;
  },
};
