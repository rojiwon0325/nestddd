import { Crypto } from '@CRYPTO/domain';
import { Account } from '@ACCOUNT/domain';
import { IAccountUsecase } from '@ACCOUNT/application/port/account.usecase.port';
import { mockRepository } from './repository.mock';
import { Test } from '@nestjs/testing';
import { AccountEntityMapper } from '@ACCOUNT/infrastructure/adapter/account.mapper';
import { AccountEntity } from '@ACCOUNT/infrastructure/adapter/account.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AccountRepository } from '@ACCOUNT/infrastructure/adapter/account.repository';
import { AccountService } from '@ACCOUNT/application/adapter/account.service';
import { AccountUsecase } from '@ACCOUNT/application/adapter/account.usecase';
import { JwtService } from '@nestjs/jwt';
jest.mock('@CRYPTO/domain');

describe('Account Usecase Integration Test', () => {
  let usecase: IAccountUsecase;
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
        AccountService,
        JwtService,
        AccountUsecase,
      ],
    }).compile();
    usecase = module.get(AccountUsecase);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Usecase should be defined', () => {
    expect(usecase).toBeDefined();
  });
});
