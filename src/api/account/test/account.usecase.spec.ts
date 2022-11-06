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
import { Account } from '@ACCOUNT/domain';
import { Crypto } from '@CRYPTO/domain';
import { ExceptionMessage } from '@COMMON/provider/message.provider';
import { IAccountService } from '@ACCOUNT/application/port/account.service.port';
jest.mock('@CRYPTO/domain');

describe('Account Usecase Unit Test', () => {
  let usecase: IAccountUsecase;
  const mockRepo = mockRepository<AccountEntity>();
  const mockJwtService = {
    sign: jest.fn(),
  };
  const mockAccountService: Record<keyof IAccountService, jest.Mock> = {
    findOne: jest.fn(),
    checkPassword: jest.fn(),
    checkPermission: jest.fn(),
    signInLocal: jest.fn(),
    checkDuplicate: jest.fn(),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AccountEntityMapper,
        {
          provide: getRepositoryToken(AccountEntity),
          useValue: mockRepo,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: AccountService,
          useValue: mockAccountService,
        },
        AccountRepository,
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

  it('signIn', async () => {
    mockAccountService.signInLocal.mockResolvedValue({ id: 12 });
    await usecase.signIn({ username: '', password: '' });
    expect(mockJwtService.sign).toBeCalledWith({ id: 12 });
    return;
  });

  it('signUp', async () => {
    mockAccountService.checkDuplicate.mockResolvedValue(true);
    mockRepo.save.mockImplementationOnce((value) => ({ ...value, id: 12 }));
    (Crypto.encrypt as any).mockResolvedValue('hashed password');
    const received = await usecase.signUp({
      email: 'test@test.com',
      username: 'signUpTest',
      password: '1234avcd',
    });
    expect(received).toEqual({
      id: 12,
      email: 'test@test.com',
      username: 'signUpTest',
      role: 'Normal',
    });
    expect(mockRepo.save).toBeCalledWith({
      username: 'signUpTest',
      password: 'hashed password',
      role: 'Normal',
      email: 'test@test.com',
      verified: false,
    });
    return;
  });

  describe('remove', () => {
    const where: Account.Public = {
      id: 2,
      username: 'test',
      email: 'test@test.com',
      role: 'Manager',
    };

    it('사용자명과 인증정보가 일치하지 않는 경우', async () => {
      await expect(() =>
        usecase.remove(where, { username: 'testname', password: '213' }),
      ).rejects.toThrowError(ExceptionMessage.FBD);
      return;
    });

    it('이메일과 인증정보가 일치하지 않는 경우', async () => {
      await expect(() =>
        usecase.remove(where, { email: 'test', password: '213' }),
      ).rejects.toThrowError(ExceptionMessage.FBD);
      return;
    });

    it('요청 성공', async () => {
      mockAccountService.signInLocal.mockResolvedValue({ id: 13 });
      await usecase.remove(where, { username: 'test', password: '' });
      expect(mockRepo.delete).toBeCalledTimes(1);
      return;
    });
  });
});
