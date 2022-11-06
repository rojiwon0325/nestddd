import { AccountService } from '@ACCOUNT/application/adapter/account.service';
import { IAccountService } from '@ACCOUNT/application/port/account.service.port';
import { AccountEntity } from '@ACCOUNT/infrastructure/adapter/account.entity';
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

      await expect(service.findOne({ id: 1 })).resolves.toEqual({
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
      await expect(service.findOne({ id: 1 })).rejects.toThrowError(
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

      await expect(
        service.checkPassword({ password: '', hashed: '' }),
      ).rejects.toThrowError('비밀번호가 일치하지 않습니다.');
      expect(spy).toBeCalledTimes(1);
      return;
    });
  });
});
