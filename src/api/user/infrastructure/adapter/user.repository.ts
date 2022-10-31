import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmBaseRepository } from 'src/api/common/base/base-repository.typeorm';
import { IEntityMapper } from 'src/api/common/interface/mapper.interface';
import { FindOneOptions, Repository } from 'typeorm';
import { IUser, IUserProperty } from '../../domain/user.interface';
import { UserEntity } from '../model/user.entity';
import { IUserRepository } from '../port/user.repository.interface';
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

  async findOne(
    where: Pick<IUserProperty, 'id'> | Pick<IUserProperty, 'username'>,
  ): Promise<IUser | null> {
    const findOption: FindOneOptions = { where };
    const entity = await this.getRepository().findOne(findOption);
    return entity == null ? null : this.getMapper().toAggregate(entity);
  }

  async save(aggregate: IUser, password?: string): Promise<IUser> {
    const entity = this.getMapper().toRootEntity(aggregate);
    if (password) {
      entity.password = password;
    }
    const { id } = await this.getRepository().save(entity);
    (aggregate as any).id = id;
    return aggregate;
  }
}
