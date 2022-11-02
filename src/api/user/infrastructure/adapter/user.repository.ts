import { UserDomain } from '@USER/domain/user.interface';
import { TypeOrmBaseRepository } from '@COMMON/base/base-repository.typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../model/user.entity';
import { IUserRepository } from '../port/user.repository.interface';
import { UserEntityMapper } from './user.mapper';
import { IEntityMapper } from '@COMMON/interface/mapper.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository
  extends TypeOrmBaseRepository<UserDomain.Aggregate, UserEntity>
  implements IUserRepository
{
  constructor(
    @Inject(UserEntityMapper)
    mapper: IEntityMapper<UserDomain.Aggregate, UserEntity>,
    @InjectRepository(UserEntity) repository: Repository<UserEntity>,
  ) {
    super(mapper, repository);
  }

  async findOne(
    where:
      | Pick<UserDomain.Property, 'id'>
      | Pick<UserDomain.Property, 'username'>,
  ): Promise<UserDomain.Aggregate | null> {
    const entity = await this.getRepository().findOne({ where });
    return entity == null ? null : this.getMapper().toAggregate(entity);
  }

  async save(
    aggregate: UserDomain.Aggregate,
    password?: string,
  ): Promise<UserDomain.Aggregate> {
    const entity = this.getMapper().toRootEntity(aggregate);
    if (password) {
      entity.password = password;
    }
    const { id } = await this.getRepository().save(entity);
    (aggregate as any).id = id;
    return aggregate;
  }
}
