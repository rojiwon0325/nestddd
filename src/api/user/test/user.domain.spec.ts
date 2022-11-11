import { User } from '@USER/domain';
describe('User Domain Unit Test', () => {
  const { get, getProfile, getProfileDetail, setMetadata, setUsername } = User;
  const now1 = new Date();
  const now2 = new Date();

  it.each<Prop>([
    { username: 'first', email: 'email@test', password: 'afew' },
    {
      id: 31,
      created_at: now1,
      updated_at: now2,
      username: 'testuser',
      email: 'test@google.com',
      password: 'qdsevrs',
      verified: true,
      metadata: { bio: "i'm test user" },
      role: 'Manager',
    },
  ])('get', (data) => {
    const { created_at, updated_at, ...received } = get(data);

    expect(received).toEqual({
      id: data.id ?? 0,
      username: data.username,
      email: data.email,
      password: data.password,
      verified: data.verified ?? false,
      role: data.role ?? 'Normal',
      metadata: data.metadata ?? {},
    });
    if (data.created_at) expect(created_at).toEqual(data.created_at);
    if (data.updated_at) expect(updated_at).toEqual(data.updated_at);
    return;
  });

  it('getProfile', () => {
    const received = getProfile({
      id: 12,
      username: 'test',
      email: 'email test',
      verified: true,
      password: 'aefs',
      role: 'Admin',
      metadata: { birth: '1977-05-30' },
      created_at: now1,
      updated_at: now2,
    });
    expect(received).toEqual({
      id: 12,
      username: 'test',
      role: 'Admin',
    });
  });

  it('getProfileDetail', () => {
    const received = getProfileDetail({
      id: 12,
      username: 'test',
      email: 'email test',
      verified: true,
      password: 'aefs',
      role: 'Admin',
      metadata: { birth: '1977-05-30' },
      created_at: now1,
      updated_at: now2,
    });
    expect(received).toEqual({
      id: 12,
      email: 'email test',
      verified: true,
      username: 'test',
      role: 'Admin',
      birth: '1977-05-30',
    });
  });

  it('setUsername', () => {
    const user: User.State = {
      id: 31,
      created_at: now1,
      updated_at: now2,
      username: 'testuser',
      email: 'test@google.com',
      password: 'qdsevrs',
      verified: true,
      metadata: { bio: "i'm test user" },
      role: 'Manager',
    };
    setUsername(user, { username: 'changed' });
    expect(user).toEqual({ ...user, username: 'changed' });
  });

  it.each<User.MetadataVO>([
    {},
    { bio: 'test bio', birth: 'test birth', phone: 'test phone' },
  ])('setMetadata', (meta) => {
    const user: User.State = {
      id: 31,
      created_at: now1,
      updated_at: now2,
      username: 'testuser',
      email: 'test@google.com',
      password: 'qdsevrs',
      verified: true,
      metadata: {
        bio: "i'm test user",
        birth: "it's my birth",
        phone: 'my phone',
      },
      role: 'Manager',
    };
    setMetadata(user, meta);
    expect(user).toEqual({
      ...user,
      metadata: {
        bio: meta.bio ?? user.metadata.bio,
        birth: meta.birth ?? user.metadata.birth,
        phone: meta.phone ?? user.metadata.phone,
      },
    });
  });
});

type Required = keyof Pick<User.State, 'password' | 'email' | 'username'>;
type Prop = Pick<User.State, Required> & Partial<Omit<User.State, Required>>;
