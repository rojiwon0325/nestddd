import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmMockRepository } from 'src/api/common/provider/mock.repository';
import { UserService } from '../application/user.service';
import { UserEntity } from '../infrastructure/user.entity';
import { UserEntityMapper } from '../infrastructure/user.mapper';
import { UserRepository } from '../infrastructure/user.repository';

describe('UserService Integration Test', () => {
  let service: UserService;
  let mockRepository: TypeOrmMockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(UserEntity),
          useClass: TypeOrmMockRepository,
        },
        UserEntityMapper,
        UserRepository,
        UserService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    mockRepository = module.get(getRepositoryToken(UserEntity));
  });

  afterEach(() => {
    mockRepository.findOne.mockClear();
    mockRepository.find.mockClear();
    mockRepository.save.mockClear();
    mockRepository.remove.mockClear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
