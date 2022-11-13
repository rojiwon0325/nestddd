import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import { IUserService } from '@USER/application/port/user.service.port';
import { UserEntity } from '@USER/infrastructure/adapter/user.entity';
import { mockRepository } from './repository.mock';
import { UserEntityMapper } from '@USER/infrastructure/adapter/user.mapper';
import { UserRepository } from '@USER/infrastructure/adapter/user.repository';
import { UserService } from '@USER/application/adapter/user.service';
import { ExceptionMessage } from '@COMMON/exception';

describe('UserService Integration Test', () => {
  let service: IUserService;
  const mockRepo = mockRepository<UserEntity>();
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
        UserEntityMapper,
        UserRepository,
        UserService,
      ],
    }).compile();

    service = module.get(UserService);
  });

  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    it('대상이 존재하지 않을 떄', async () => {
      mockRepo.findOne.mockResolvedValue(null);

      await expect(() => service.findOne({ id: 12 })).rejects.toThrowError(
        ExceptionMessage.NF,
      );
    });
    it('대상이 존재할 떄', async () => {
      mockRepo.findOne.mockResolvedValue(entity);
      const received = await service.findOne({ id: 12 });

      expect(received).toEqual({
        id: 12,
        created_at: now1,
        updated_at: now2,
        username: 'testuser',
        email: 'test@test.com',
        role: 'Manager',
        password: '12345rtg',
        verified: true,
        metadata: {
          bio: 'my bio',
          birth: 'my birth',
          phone: 'my phone',
        },
      });
      expect(mockRepo.findOne).toBeCalledTimes(1);
      expect(mockRepo.findOne).toBeCalledWith({ where: { id: 12 } });
    });
  });
});
