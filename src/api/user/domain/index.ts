import { IUserAggregate } from '@INTERFACE/user/domain';

const permissionLevel: { [key in IUserAggregate.Permission]: number } = {
  Admin: 0,
  Manager: 1,
  Normal: 2,
};

export const UserAggregate: IUserAggregate = {
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
