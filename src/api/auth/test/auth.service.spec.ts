import { AuthService } from '@AUTH/application/adapter/auth.service';
import { IAuthService } from '@AUTH/application/port/auth.service.port';
import { Auth } from '@AUTH/domain';
import { AuthRepository } from '@AUTH/infrastructure/adapter/auth.repository';
import { ExceptionMessage } from '@COMMON/exception';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '@USER/infrastructure/adapter/user.entity';
import { mockRepository } from './repository.mock';
import { Crypto } from '@CRYPTO/domain';
import { AuthExceptionMessage } from '@AUTH/provider/constant/exception-message';
jest.mock('@CRYPTO/domain');

describe('AuthService Integration Test', () => {
  let service: IAuthService;
  const mockRepo = mockRepository<UserEntity>();
  const entity = new UserEntity();
  entity.id = 12;
  entity.username = 'testuser';
  entity.email = 'test@test.com';
  entity.role = 'Normal';
  entity.password = '12345rtg';
  entity.verified = true;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockRepo,
        },
        AuthRepository,
        AuthService,
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    it('대상이 존재하지 않을 때', async () => {
      mockRepo.findOne.mockResolvedValue(null);

      await expect(() => service.findOne({ id: 12 })).rejects.toThrowError(
        ExceptionMessage.NotFound,
      );
    });

    it('대상이 존재할 때', async () => {
      mockRepo.findOne.mockResolvedValue(entity);

      const received = await service.findOne({ id: 12 });

      expect(received).toEqual<Auth.State>({
        id: 12,
        email: 'test@test.com',
        password: '12345rtg',
        role: 'Normal',
        verified: true,
      });
      expect(mockRepo.findOne).toBeCalledTimes(1);
      expect(mockRepo.findOne).toBeCalledWith({ where: { id: 12 } });
    });
  });

  describe('checkPermission', () => {
    it('Reject', () => {
      expect(() =>
        service.checkPermission({
          user: 'Normal',
          permission: 'Admin',
        }),
      ).toThrowError(ExceptionMessage.FBD);
    });
    it('Accept', () => {
      service.checkPermission({
        user: 'Admin',
        permission: 'Normal',
      });
    });
  });

  describe('checkPassword', () => {
    it('Reject', async () => {
      (Crypto.compare as any).mockResolvedValue(false);
      const spy = jest.spyOn(Crypto, 'compare');

      await expect(() =>
        service.checkPassword({ password: '', hashed: '' }),
      ).rejects.toThrowError(AuthExceptionMessage.password);
      expect(spy).toBeCalledTimes(1);
      return;
    });
    it('Accept', async () => {
      (Crypto.compare as any).mockResolvedValue(true);
      const spy = jest.spyOn(Crypto, 'compare');

      await service.checkPassword({ password: '', hashed: '' });
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('checkDuplicate', () => {
    it('사용중인 이메일', async () => {
      mockRepo.findOne.mockResolvedValue({ id: 12, email: 'test' });

      await expect(() =>
        service.checkDuplicate({ email: '' }),
      ).rejects.toThrowError(AuthExceptionMessage.email_unique);
    });

    it('사용가능한 이메일', async () => {
      mockRepo.findOne.mockResolvedValue(null);

      await service.checkDuplicate({ email: '' });
    });
  });

  describe('checkVerified', () => {
    it('Reject', () => {
      expect(() => service.checkVerified({ verified: false })).toThrowError(
        AuthExceptionMessage.email_verified,
      );
    });

    it('Accept', () => {
      service.checkVerified({ verified: true });
    });
  });
});
