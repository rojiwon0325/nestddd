import { Test } from '@nestjs/testing';
import { AccountEntityMapper } from '@ACCOUNT/infrastructure/adapter/account.mapper';
import { AccountRepository } from '@ACCOUNT/infrastructure/adapter/account.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AccountEntity } from '@ACCOUNT/infrastructure/adapter/account.entity';

const mockRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

describe('Account Repository Unit Test', () => {
  let repository: AccountRepository;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AccountEntityMapper,
        {
          provide: getRepositoryToken(AccountEntity),
          useValue: mockRepository,
        },
        AccountRepository,
      ],
    }).compile();
    repository = module.get(AccountRepository);
  });

  it('Repository should be defined', () => {
    expect(repository).toBeDefined();
  });
});
