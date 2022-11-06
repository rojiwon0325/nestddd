import { Test } from '@nestjs/testing';
import { AccountEntityMapper } from '@ACCOUNT/infrastructure/adapter/account.mapper';
import { AccountRepository } from '@ACCOUNT/infrastructure/adapter/account.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AccountEntity } from '@ACCOUNT/infrastructure/adapter/account.entity';
import { mockRepository } from './repository.mock';
import { Account } from '@ACCOUNT/domain';
import { IAccountRepository } from '@ACCOUNT/infrastructure/port/account.repository.port';
import { IEntityMapper } from '@COMMON/interface/mapper.interface';

describe('Account Repository Unit Test', () => {
  let repository: IAccountRepository;
  let mapper: IEntityMapper<Account.Property, AccountEntity>;
  const mockRepo = mockRepository();
  const now1 = new Date();
  const now2 = new Date();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AccountEntityMapper,
        {
          provide: getRepositoryToken(AccountEntity),
          useValue: mockRepo,
        },
        AccountRepository,
      ],
    }).compile();
    repository = module.get(AccountRepository);
    mapper = module.get(AccountEntityMapper);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findOne', () => {
    const entity = new AccountEntity();
    entity.id = 12;
    entity.username = 'testuser';
    entity.email = 'test@test.com';
    entity.role = 'Normal';
    entity.password = '12345rtg';
    entity.verified = true;
    entity.created_at = now1;
    entity.updated_at = now2;
    it('findOne - 대상이 존재할 때', async () => {
      mockRepo.findOne.mockResolvedValue(entity);
      const received = await repository.findOne({ id: 12 });

      expect(received).toEqual<Account.Property>({
        id: 12,
        username: 'testuser',
        email: 'test@test.com',
        role: 'Normal',
        password: '12345rtg',
        verified: true,
        created_at: now1,
        updated_at: now2,
      });
      expect(mockRepo.findOne).toBeCalledTimes(1);
      expect(mockRepo.findOne).toBeCalledWith({ where: { id: 12 } });
      return;
    });
    it('findOne - 대상이 존재하지 않을 때', async () => {
      mockRepo.findOne.mockResolvedValue(null);
      const spy = jest.spyOn(mapper, 'toAggregate');

      const received = await repository.findOne({ id: 12 });

      expect(received).toBe(null);
      expect(mockRepo.findOne).toBeCalledTimes(1);
      expect(spy).toBeCalledTimes(0);
      return;
    });
  });

  it('save', async () => {
    const spyRE = jest.spyOn(mapper, 'toRootEntity');
    const spyER = jest.spyOn(mapper, 'toAggregate');

    mockRepo.save.mockImplementationOnce((value) => value);
    const { created_at, updated_at, ...received } = await repository.save({
      id: 0,
      username: 'testuser',
      email: 'test@test.com',
      role: 'Normal',
      password: '12345rtg',
      verified: true,
      created_at: now1,
      updated_at: now2,
    });
    expect(received).toEqual({
      id: 0,
      username: 'testuser',
      email: 'test@test.com',
      role: 'Normal',
      password: '12345rtg',
      verified: true,
    });
    expect(created_at).not.toEqual(now1);
    expect(updated_at).not.toEqual(now2);
    expect(spyER).toBeCalledTimes(1);
    expect(spyRE).toBeCalledTimes(1);
    return;
  });
  it('remove', async () => {
    await repository.remove({
      id: 2,
      username: 'testuser',
      email: 'test@test.com',
      role: 'Normal',
      password: '12345rtg',
      verified: true,
      created_at: now1,
      updated_at: now2,
    });
    expect(mockRepo.delete).toBeCalledTimes(1);
    expect(mockRepo.delete).toBeCalledWith(2);
    return;
  });
});
