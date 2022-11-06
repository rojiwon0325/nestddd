import { Account } from '@ACCOUNT/domain';
import { AccountEntity } from '@ACCOUNT/infrastructure/adapter/account.entity';
import { AccountEntityMapper } from '@ACCOUNT/infrastructure/adapter/account.mapper';

describe('AccountEntityMapper Unit Test', () => {
  const mapper = new AccountEntityMapper();
  const now1 = new Date();
  const now2 = new Date();

  it('Entity To Aggregate', () => {
    const entity = new AccountEntity();
    entity.id = 1;
    entity.created_at = now1;
    entity.updated_at = now2;
    entity.username = 'testuser';
    entity.password = '12345';
    entity.role = 'Normal';
    entity.verified = true;
    entity.email = 'test@test.com';
    const account = mapper.toAggregate(entity);
    expect(account).toEqual({
      id: 1,
      created_at: now1,
      updated_at: now2,
      username: 'testuser',
      password: '12345',
      role: 'Normal',
      verified: true,
      email: 'test@test.com',
    });
    return;
  });

  it.each<Account.Property>([
    {
      id: 0,
      username: 'testname1',
      email: 'test1@test.com',
      password: '12345',
      role: 'Manager',
      verified: true,
      created_at: now1,
      updated_at: now2,
    },
    {
      id: 3,
      username: 'testname2',
      email: 'test2@test.com',
      password: '54321',
      role: 'Normal',
      verified: false,
      created_at: now2,
      updated_at: now1,
    },
  ])('Aggregate To Entity', (data) => {
    const { ...entity } = mapper.toRootEntity(data);

    expect(entity).toEqual({
      id: data.id === 0 ? undefined : data.id,
      email: data.email,
      username: data.username,
      password: data.password,
      verified: data.verified,
      role: data.role,
    });
    return;
  });
});
