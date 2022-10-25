import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IEntityMapper } from 'src/api/common/interface/mapper.interface';
import { TypeOrmBaseRepository } from 'src/api/common/provider/repository.base';
import { Repository } from 'typeorm';
import { IUser, IUserId } from '../domain/user.interface';
import { IUserRepository } from '../domain/repository.interface';
import { UserEntity } from './user.entity';
import { UserEntityMapper } from './user.mapper';

@Injectable()
export class UserRepository
  extends TypeOrmBaseRepository<IUserId, IUser, UserEntity>
  implements IUserRepository
{
  constructor(
    @Inject(UserEntityMapper) mapper: IEntityMapper<IUser, UserEntity>,
    @InjectRepository(UserEntity) repository: Repository<UserEntity>,
  ) {
    super(mapper, repository);
  }
}
