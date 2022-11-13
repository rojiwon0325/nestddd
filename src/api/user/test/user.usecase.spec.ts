import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '@USER/application/adapter/user.service';
import { UserUsecase } from '@USER/application/adapter/user.usecase';
import { IUserUsecase } from '@USER/application/port/user.usecase.port';
import { UserEntity } from '@USER/infrastructure/adapter/user.entity';
import { UserEntityMapper } from '@USER/infrastructure/adapter/user.mapper';
import { UserRepository } from '@USER/infrastructure/adapter/user.repository';
import { mockRepository } from './repository.mock';
import { Crypto } from '@CRYPTO/domain';
import { ExceptionMessage, HttpExceptionFactory } from '@COMMON/exception';
import { AuthService } from '@AUTH/application/adapter/auth.service';
import { IAuthService } from '@AUTH/application/port/auth.service.port';
import { AuthExceptionMessage } from '@AUTH/provider/constant/exception-message';
jest.mock('@CRYPTO/domain');

describe('UserUsecase Integration Test', () => {
  let usecase: IUserUsecase;
  const mockRepo = mockRepository<UserEntity>();
  const mockService: Record<keyof IAuthService, jest.Mock> = {
    findOne: jest.fn(),
    checkPermission: jest.fn(),
    checkPassword: jest.fn(),
    checkDuplicate: jest.fn(),
    checkVerified: jest.fn(),
  };
  const now1 = new Date();
  const now2 = new Date();
  const entity = new UserEntity();
  entity.id = 12;
  entity.username = 'testuser';
  entity.email = 'test@test.com';
  entity.role = 'Manager';
  entity.password = '12345rtg';
  entity.verified = true;
  entity.bio = 'my bio';
  entity.birth = 'my birth';
  entity.phone = 'my phone';
  entity.created_at = now1;
  entity.updated_at = now2;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: getRepositoryToken(UserEntity), useValue: mockRepo },
        { provide: AuthService, useValue: mockService },
        UserEntityMapper,
        UserRepository,
        UserService,
        UserUsecase,
      ],
    }).compile();

    usecase = module.get(UserUsecase);
  });

  it('Usecase should be defined', () => {
    expect(usecase).toBeDefined();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    it('대상이 존재하지 않을 때', async () => {
      mockRepo.findOne.mockResolvedValue(null);

      await expect(() => usecase.findOne({ id: 12 })).rejects.toThrowError(
        ExceptionMessage.NF,
      );
    });
    it('대상이 존재할 때', async () => {
      mockRepo.findOne.mockResolvedValue(entity);
      const received = await usecase.findOne({ id: 12 });
      expect(received).toEqual({
        id: 12,
        username: 'testuser',
        role: 'Manager',
        bio: 'my bio',
      });
    });
  });

  it('findMe', async () => {
    mockRepo.findOne.mockResolvedValue(entity);
    const received = await usecase.findMe({ id: 12 });
    expect(received).toEqual({
      id: 12,
      username: 'testuser',
      role: 'Manager',
      bio: 'my bio',
      birth: 'my birth',
      email: 'test@test.com',
      phone: 'my phone',
      verified: true,
    });
  });

  describe('create', () => {
    it('이메일이 중복일 때', async () => {
      mockService.checkDuplicate.mockRejectedValue(
        HttpExceptionFactory('BadRequest', AuthExceptionMessage.email_unique),
      );

      await expect(() =>
        usecase.create({
          username: 'test',
          email: 'email',
          password: 'password',
        }),
      ).rejects.toThrowError(AuthExceptionMessage.email_unique);
    });
    it('새로운 사용자 생성', async () => {
      (Crypto as any).encrypt.mockResolvedValue('hashed');
      mockService.checkDuplicate.mockResolvedValue(null);
      mockRepo.save.mockResolvedValue(entity);
      const receivced = await usecase.create({
        username: 'sfdsfsd',
        email: 'sdfsdfsdfsdd',
        password: 'sdffdsfsdsdfsd',
      });

      expect(receivced).toEqual({
        id: 12,
        username: 'testuser',
        email: 'test@test.com',
        role: 'Manager',
        verified: true,
        bio: 'my bio',
        birth: 'my birth',
        phone: 'my phone',
      });
    });
  });

  it.each<IUserUsecase.Update>([
    { bio: 'new bio', birth: 'new birth' },
    { username: 'changed username', phone: 'new phone' },
  ])('update', async (data) => {
    mockRepo.findOne.mockResolvedValue(entity);
    mockRepo.save.mockImplementation((value) => value);
    const received = await usecase.update({ id: 12 }, data);

    expect(received).toEqual({
      id: 12,
      username: data.username ?? 'testuser',
      email: 'test@test.com',
      role: 'Manager',
      verified: true,
      bio: data.bio ?? 'my bio',
      birth: data.birth ?? 'my birth',
      phone: data.phone ?? 'my phone',
    });
  });

  it('remove', async () => {
    const spy = jest.spyOn(mockRepo, 'delete');

    await usecase.remove({ id: 123 });

    expect(spy).toBeCalledTimes(1);
    expect(mockRepo.delete).toBeCalledWith(123);
  });
});
