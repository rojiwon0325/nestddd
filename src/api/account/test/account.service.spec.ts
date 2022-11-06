import { AccountService } from '@ACCOUNT/application/adapter/account.service';
import { IAccountService } from '@ACCOUNT/application/port/account.service.port';
import {
  AccountEntity,
  AccountErrorMessage,
} from '@ACCOUNT/infrastructure/adapter/account.entity';
import { AccountEntityMapper } from '@ACCOUNT/infrastructure/adapter/account.mapper';
import { AccountRepository } from '@ACCOUNT/infrastructure/adapter/account.repository';
import { ExceptionMessage } from '@COMMON/provider/message.provider';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockRepository } from './repository.mock';
import { Crypto } from '@CRYPTO/domain';
jest.mock('@CRYPTO/domain');

describe('Account Service Unit Test', () => {
  let service: IAccountService;
  const mockRepo = mockRepository<AccountEntity>();
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
      ],
    }).compile();
    service = module.get(AccountService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('대상이 존재할 때', async () => {
      mockRepo.findOne.mockResolvedValue({
        id: 1,
        username: 'testuser',
        role: 'Normal',
        email: 'test@test.com',
        verified: true,
        password: '12345',
        created_at: now1,
        updated_at: now2,
      });

      const received = await service.findOne({ id: 1 });
      expect(received).toEqual({
        id: 1,
        username: 'testuser',
        role: 'Normal',
        email: 'test@test.com',
        verified: true,
        password: '12345',
        created_at: now1,
        updated_at: now2,
      });
      return;
    });
    it('대상이 없을 때', async () => {
      mockRepo.findOne.mockResolvedValue(null);
      await expect(() => service.findOne({ id: 1 })).rejects.toThrowError(
        ExceptionMessage.NotFound,
      );
      return;
    });
  });

  describe('checkPassword', () => {
    it('비밀번호가 일치하는 경우', async () => {
      (Crypto.compare as any).mockResolvedValue(true);
      const spy = jest.spyOn(Crypto, 'compare');

      await service.checkPassword({ password: '', hashed: '' });
      expect(spy).toBeCalledTimes(1);
      return;
    });

    it('비밀번호가 틀린 경우', async () => {
      (Crypto.compare as any).mockResolvedValue(false);
      const spy = jest.spyOn(Crypto, 'compare');

      await expect(() =>
        service.checkPassword({ password: '', hashed: '' }),
      ).rejects.toThrowError('비밀번호가 일치하지 않습니다.');
      expect(spy).toBeCalledTimes(1);
      return;
    });
  });

  it('signInLocal', async () => {
    mockRepo.findOne.mockResolvedValue({
      id: 2,
      username: 'tesfse',
      email: 'bosdf@gmail.com',
      verified: true,
      role: 'Manager',
      password: '123',
      created_at: now1,
      updated_at: now2,
      something: 'something',
    });
    (Crypto.compare as any).mockResolvedValue(true);

    const spy = jest.spyOn(service, 'checkPassword');

    const received = await service.signInLocal({
      password: '123',
      username: '234',
    });

    expect(received).toEqual({
      id: 2,
      username: 'tesfse',
      email: 'bosdf@gmail.com',
      verified: true,
      role: 'Manager',
      password: '123',
      created_at: now1,
      updated_at: now2,
    });
    expect(spy).toBeCalledTimes(1);
    return;
  });

  describe('checkPermission', () => {
    it('권한 없음', () => {
      expect(() =>
        service.checkPermission({ user: 'Normal', permission: 'Admin' }),
      ).toThrowError(ExceptionMessage.FBD);
      return;
    });

    it('권한 인증', () => {
      service.checkPermission({ user: 'Admin', permission: 'Admin' });
      return;
    });
  });

  describe('checkDuplicate', () => {
    it('사용할 수 없는 이름인 경우', async () => {
      mockRepo.findOne.mockResolvedValue({ id: 2, username: 'test' });
      await expect(() =>
        service.checkDuplicate({ username: 'test' }),
      ).rejects.toThrowError(AccountErrorMessage.username_unique);
      return;
    });

    it('사용할 수 없는 이메일인 경우', async () => {
      mockRepo.findOne.mockResolvedValue({ id: 2, email: 'test' });
      await expect(() =>
        service.checkDuplicate({ email: 'test' }),
      ).rejects.toThrowError(AccountErrorMessage.email_unique);
      return;
    });

    it('사용가능한 이메일/이름인 경우', async () => {
      mockRepo.findOne.mockResolvedValue(null);
      await service.checkDuplicate({ username: '' });
      await service.checkDuplicate({ email: '' });
      return;
    });
  });
});
