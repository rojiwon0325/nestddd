/* eslint-disable @typescript-eslint/no-unused-vars */
import { Account } from '@ACCOUNT/domain';
type Required = keyof Pick<Account.Property, 'username' | 'email' | 'password'>;
type Props = Pick<Account.Property, Required> &
  Partial<Omit<Account.Property, Required>>;

describe('Account Domain Unit Test', () => {
  const { get, getPublic, checkPermission, setUsername } = Account;
  const now = new Date();
  const getExample: Props[] = [
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
  ];
  it.each(getExample)('Account.get', (data) => {
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

  const agg = get({
    id: 1,
    email: 'test@test.com',
    username: 'testuser',
    password: '1234',
    role: 'Manager',
  });

  it('Account.getPublic', () => {
    const result = getPublic(agg);
    expect(result).toEqual({
      id: agg.id,
      email: agg.email,
      username: agg.username,
      role: agg.role,
    });
    return;
  });

  it('checkPermission', () => {
    return;
  });
  it('setUsername', () => {
    return;
  });
  it('setPassword', () => {
    return;
  });
});
