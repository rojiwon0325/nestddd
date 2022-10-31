import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IEntityMapper } from 'src/api/common/interface/mapper.interface';
import { TypeOrmBaseRepository } from 'src/api/common/base/base-repository.typeorm';
import { Repository } from 'typeorm';
import { IUser } from '../../user/domain/user.interface';
import { IUserRepository } from '../domain/repository.interface';
import { UserEntity } from './user.entity';
import { UserEntityMapper } from './user.mapper';

@Injectable()
export class UserRepository
  extends TypeOrmBaseRepository<IUser, UserEntity>
  implements IUserRepository
{
  constructor(
    @Inject(UserEntityMapper) mapper: IEntityMapper<IUser, UserEntity>,
    @InjectRepository(UserEntity) repository: Repository<UserEntity>,
  ) {
    super(mapper, repository);
  }
}
