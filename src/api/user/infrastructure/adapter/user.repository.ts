import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmBaseRepository } from 'src/api/common/base/base-repository.typeorm';
import { IEntityMapper } from 'src/api/common/interface/mapper.interface';
import { UserEntity } from 'src/api/users/infrastructure/user.entity';
import { UserEntityMapper } from 'src/api/users/infrastructure/user.mapper';
import { Repository } from 'typeorm';
import { IUser } from '../../domain/user.interface';
import { IUserRepository } from '../port/user.repository.interface';

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
