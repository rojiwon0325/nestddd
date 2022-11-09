import { TypeOrmBaseRepository } from '@COMMON/base/base-repository.typeorm';
import { IEntityMapper } from '@COMMON/interface/mapper.interface';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@USER/domain';
import { Repository } from 'typeorm';
import { IUserRepository } from '../port/user.repository.port';
import { UserEntity } from './user.entity';
import { UserEntityMapper } from './user.mapper';

@Injectable()
export class UserRepository
  extends TypeOrmBaseRepository<User.State, UserEntity>
  implements IUserRepository
{
  constructor(
    @Inject(UserEntityMapper)
    mapper: IEntityMapper<User.State, UserEntity>,
    @InjectRepository(UserEntity)
    repository: Repository<UserEntity>,
  ) {
    super(mapper, repository);
  }
}
