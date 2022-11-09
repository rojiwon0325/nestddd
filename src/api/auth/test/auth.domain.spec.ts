import { Auth } from '@AUTH/domain';

describe('Auth Domain Unit Test', () => {
  const { get, getPublic, checkPermission } = Auth;

  const testData = get({
    id: 1,
    email: 'test@test.com',
    password: '12345',
    role: 'Normal',
    verified: false,
  });

  it('get', () => {
    const data = { ...testData, other: 'is will filtering' };
    const received = get(data);
    expect(received).toEqual({
      id: 1,
      email: 'test@test.com',
      password: '12345',
      role: 'Normal',
      verified: false,
    });
  });

  it('getPublic', () => {
    const received = getPublic(testData);

    expect(received).toEqual({
      id: 1,
      email: 'test@test.com',
      role: 'Normal',
    });
  });

  describe('checkPermission', () => {
    it.each<Auth.CheckPermission>([
      { user: 'Normal', permission: 'Manager' },
      { user: 'Normal', permission: 'Admin' },
      { user: 'Manager', permission: 'Admin' },
    ])('false', (data) => {
      const received = checkPermission(data);

      expect(received).toBe(false);
    });

    it.each<Auth.CheckPermission>([
      { user: 'Admin', permission: 'Admin' },
      { user: 'Admin', permission: 'Manager' },
      { user: 'Admin', permission: 'Normal' },
      { user: 'Manager', permission: 'Manager' },
      { user: 'Manager', permission: 'Normal' },
      { user: 'Normal', permission: 'Normal' },
    ])('true', (data) => {
      const received = checkPermission(data);

      expect(received).toBe(true);
    });
  });
});
