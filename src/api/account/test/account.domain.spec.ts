/* eslint-disable @typescript-eslint/no-unused-vars */
import { Account } from '@ACCOUNT/domain';
const { get, getPublic, checkPermission, setUsername } = Account;
const now = new Date();

describe('Account Domain Unit Test', () => {
  it.each<Get>([
    {
      email: 'test@test.com',
      username: 'testuser',
      password: '12345t322',
    },
    {
      id: 3,
      email: 'test@test.com',
      username: 'testuser',
      password: '12345t322',
      role: 'Admin',
      verified: true,
    },
    {
      email: 'test@test.com',
      username: 'testuser',
      password: '12345t322',
      created_at: now,
      updated_at: now,
    },
  ])('Account.get', (data) => {
    const { created_at, updated_at, ...account } = get(data);
    if (data.created_at != null) {
      expect(created_at).toEqual(data.created_at);
    }
    if (data.updated_at != null) {
      expect(updated_at).toEqual(data.updated_at);
    }
    expect(account).toEqual({
      id: data.id ?? 0,
      email: data.email,
      username: data.username,
      password: data.password,
      role: data.role ?? 'Normal',
      verified: data.verified ?? false,
    });
  });

  it('Account.getPublic', () => {
    const data = get({
      id: 1,
      email: 'test@test.com',
      username: 'testuser',
      password: '1234',
      role: 'Manager',
    });
    const result = getPublic(data);
    expect(result).toEqual({
      id: data.id,
      email: data.email,
      username: data.username,
      role: data.role,
    });
    return;
  });

  it.each<CheckPermission>([
    { user: 'Admin', permission: 'Admin' },
    { user: 'Admin', permission: 'Normal' },
    { user: 'Admin', permission: 'Manager' },
    { user: 'Manager', permission: 'Manager' },
    { user: 'Manager', permission: 'Normal' },
    { user: 'Normal', permission: 'Normal' },
  ])('Account.checkPermission - true', (data) => {
    const result = checkPermission(data);
    expect(result).toBe(true);
    return;
  });
  it.each<CheckPermission>([
    { user: 'Normal', permission: 'Admin' },
    { user: 'Normal', permission: 'Manager' },
    { user: 'Manager', permission: 'Admin' },
  ])('Account.checkPermission - false', (data) => {
    const result = checkPermission(data);
    expect(result).toBe(false);
  });

  it('setUsername', () => {
    return;
  });
  it('setPassword', () => {
    return;
  });
});

type Required = keyof Pick<Account.Property, 'username' | 'email' | 'password'>;
type Get = Pick<Account.Property, Required> &
  Partial<Omit<Account.Property, Required>>;
type CheckPermission = {
  readonly user: Account.Permission;
  readonly permission: Account.Permission;
};
