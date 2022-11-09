import { User } from '@USER/domain';

export namespace Auth {
  export type Id = User.Id;
  export type Permission = User.Permission;

  export type State = Pick<
    User.State,
    'id' | 'email' | 'password' | 'role' | 'verified'
  >;

  export type CheckPermission = {
    readonly user: Auth.Permission;
    readonly permission: Auth.Permission;
  };
  export type CheckPassword = {
    readonly password: string;
    readonly hashed: string;
  };
  export type Public = Pick<Auth.State, 'id' | 'email' | 'role'>;
}

export interface Auth {
  readonly get: (props: Auth.State) => Auth.State;
  readonly getPublic: (props: Auth.State) => Auth.Public;
}

export interface Auth {
  readonly checkPermission: (args: Auth.CheckPermission) => boolean;
}
const permissionLevel: { [key in Auth.Permission]: number } = {
  Admin: 0,
  Manager: 1,
  Normal: 2,
};

export const Auth: Auth = {
  get(args) {
    const { id, role, email, password, verified } = args;
    return { id, role, email, password, verified };
  },
  getPublic(args) {
    const { id, role, email } = args;
    return { id, role, email };
  },
  checkPermission({ user, permission }) {
    const ulevel = permissionLevel[user];
    const plevel = permissionLevel[permission];
    return ulevel <= plevel;
  },
};
