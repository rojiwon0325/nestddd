import { User } from '@USER/domain';
import { UserEntity } from '@USER/infrastructure/adapter/user.entity';
import { UserEntityMapper } from '@USER/infrastructure/adapter/user.mapper';

describe('UserEntityMapper Unit Test', () => {
  const mapper = new UserEntityMapper();
  const now1 = new Date();
  const now2 = new Date();
  const entity = new UserEntity();
  entity.id = 12;
  entity.username = 'testuser';
  entity.email = 'fdfvds@dgae.com';
  entity.verified = false;
  entity.role = 'Admin';
  entity.password = 'adfasf';
  entity.bio = "i'm tester";
  entity.birth = '1987-07-15';
  entity.phone = '010-1234-1234';
  it('toAggregate', () => {
    const { created_at, updated_at, ...received } = mapper.toAggregate(entity);
    expect(received).toEqual({
      id: 12,
      username: 'testuser',
      email: 'fdfvds@dgae.com',
      verified: false,
      role: 'Admin',
      password: 'adfasf',
      metadata: {
        bio: "i'm tester",
        birth: '1987-07-15',
        phone: '010-1234-1234',
      },
    });
    return;
  });

  it.each<User.State>([
    {
      id: 12,
      username: 'testuser',
      email: 'fdfvds@dgae.com',
      verified: false,
      role: 'Admin',
      password: 'adfasf',
      metadata: {
        bio: "i'm tester",
        birth: '1987-07-15',
        phone: '010-1234-1234',
      },
      created_at: now1,
      updated_at: now2,
    },
    {
      id: 0,
      username: 'testuser',
      email: 'fdfvds@dgae.com',
      verified: false,
      role: 'Admin',
      password: 'adfasf',
      metadata: {},
      created_at: now1,
      updated_at: now2,
    },
  ])('toRootEntity', (data) => {
    const { id, bio, birth, phone, created_at, updated_at, ...received } =
      mapper.toRootEntity(data);
    expect(received).toEqual({
      email: data.email,
      username: data.username,
      role: data.role,
      password: data.password,
      verified: data.verified,
    });
    expect(id).toBe(data.id || undefined);
    expect(bio).toBe(data.metadata.bio || undefined);
    expect(birth).toBe(data.metadata.birth || undefined);
    expect(phone).toBe(data.metadata.phone || undefined);
    expect(created_at).toBe(undefined);
    expect(updated_at).toBe(undefined);
    return;
  });
});
