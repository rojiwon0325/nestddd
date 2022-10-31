export enum UserRole {
  Normal = 'Normal',
  Manager = 'Manager',
  Admin = 'Admin',
}

type IRoleLevel = {
  [key in UserRole]: number;
};

export const RoleLevel: IRoleLevel = {
  Admin: 0,
  Manager: 1,
  Normal: 2,
};
