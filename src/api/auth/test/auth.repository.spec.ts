import { Auth } from '@AUTH/domain';
import { AuthRepository } from '@AUTH/infrastructure/adapter/auth.repository';
import { IAuthRepository } from '@AUTH/infrastructure/port/auth.repository.port';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '@USER/infrastructure/adapter/user.entity';
import { mockRepository } from './repository.mock';

describe('AuthRepository Unit Test', () => {
  let repository: IAuthRepository;
  const mockRepo = mockRepository<UserEntity>();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockRepo,
        },
        AuthRepository,
      ],
    }).compile();

    repository = module.get(AuthRepository);
  });

  it('Repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    const entity = new UserEntity();
    entity.id = 12;
    entity.username = 'testuser';
    entity.email = 'test@test.com';
    entity.role = 'Normal';
    entity.password = '12345rtg';
    entity.verified = true;

    it('대상이 존재하지 않을 때', async () => {
      mockRepo.findOne.mockResolvedValue(null);

      const spy = jest.spyOn(Auth, 'get');

      const received = await repository.findOne({ id: 12 });

      expect(received).toBe(null);
      expect(mockRepo.findOne).toBeCalledTimes(1);
      expect(spy).toBeCalledTimes(0);
    });

    it('대상이 존재할 때', async () => {
      mockRepo.findOne.mockResolvedValue(entity);

      const received = await repository.findOne({ id: 12 });

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
});
