import { AuthService } from '@AUTH/application/adapter/auth.service';
import { AuthRepository } from '@AUTH/infrastructure/adapter/auth.repository';
import { ExceptionMessage } from '@COMMON/exception';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '@USER/infrastructure/adapter/user.entity';
import { mockRepository } from './repository.mock';
import { Crypto } from '@CRYPTO/domain';
import { AuthExceptionMessage } from '@AUTH/provider/constant/exception-message';
import { IAuthUsecase } from '@AUTH/application/port/auth.usecase.port';
import { AuthUsecase } from '@AUTH/application/adapter/auth.usecase';
import { IAuthService } from '@AUTH/application/port/auth.service.port';
import { JwtService } from '@nestjs/jwt';
import { Cookie } from '@AUTH/provider/constant/cookie';
jest.mock('@CRYPTO/domain');

describe('AuthUsecase Integration Test', () => {
  let usecase: IAuthUsecase;
  let service: IAuthService;
  const mockRepo = mockRepository<UserEntity>();
  const mockJwtService = {
    sign: jest.fn(),
  };
  const entity = new UserEntity();
  entity.id = 12;
  entity.username = 'testuser';
  entity.email = 'test@test.com';
  entity.role = 'Normal';
  entity.password = '12345rtg';
  entity.verified = false;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockRepo,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        AuthRepository,
        AuthService,
        AuthUsecase,
      ],
    }).compile();

    usecase = module.get(AuthUsecase);
    service = module.get(AuthService);
  });

  it('Usecase should be defined', () => {
    expect(usecase).toBeDefined();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    const dto = { email: 'test@test.com', password: '231414' };

    it('대상이 존재하지 않을 때', async () => {
      mockRepo.findOne.mockResolvedValue(null);
      const spyPassword = jest.spyOn(service, 'checkPassword');

      await expect(() => usecase.signIn(dto)).rejects.toThrowError(
        ExceptionMessage.NF,
      );
      expect(spyPassword).toBeCalledTimes(0);
    });

    it('비밀번호가 일치하지 않을 때', async () => {
      mockRepo.findOne.mockResolvedValue(entity);
      (Crypto.compare as any).mockResolvedValue(false);
      const spyPassword = jest.spyOn(service, 'checkPassword');
      const spyVerified = jest.spyOn(service, 'checkVerified');

      await expect(() => usecase.signIn(dto)).rejects.toThrowError(
        AuthExceptionMessage.password,
      );
      expect(spyPassword).toBeCalledTimes(1);
      expect(spyVerified).toBeCalledTimes(0);
    });

    it('이메일 인증이 완료되지 않았을 때', async () => {
      mockRepo.findOne.mockResolvedValue(entity);
      (Crypto.compare as any).mockResolvedValue(true);
      const spyVerified = jest.spyOn(service, 'checkVerified');
      const spySign = jest.spyOn(mockJwtService, 'sign');

      await expect(() => usecase.signIn(dto)).rejects.toThrowError(
        AuthExceptionMessage.email_verified,
      );

      expect(spyVerified).toBeCalledTimes(1);
      expect(spySign).toBeCalledTimes(0);
    });

    it('Accept SignIn', async () => {
      mockRepo.findOne.mockResolvedValue({ ...entity, verified: true });
      (Crypto.compare as any).mockResolvedValue(true);
      mockJwtService.sign.mockReturnValue('test token');
      const spySign = jest.spyOn(mockJwtService, 'sign');

      const received = await usecase.signIn(dto);

      expect(received).toEqual([Cookie.name, 'test token', Cookie.option]);
      expect(spySign).toBeCalledTimes(1);
      return;
    });
  });
});
