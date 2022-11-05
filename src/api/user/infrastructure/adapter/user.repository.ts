import { TypeOrmBaseRepository } from '@COMMON/base/base-repository.typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from '../port/user.repository.port';
import { UserEntityMapper } from './user.mapper';
import { IEntityMapper } from '@COMMON/interface/mapper.interface';
import { Repository } from 'typeorm';
import { User } from '@USER/domain';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository
  extends TypeOrmBaseRepository<User.Property, UserEntity>
  implements IUserRepository
{
  constructor(
    @Inject(UserEntityMapper)
    mapper: IEntityMapper<User.Property, UserEntity>,
    @InjectRepository(UserEntity) repository: Repository<UserEntity>,
  ) {
    super(mapper, repository);
  }

  async findOne(where: IUserRepository.FindOne): Promise<User.Property | null> {
    const entity = await this.getRepository().findOne({
      where,
      relations: { account: true },
    });
    return entity == null ? null : this.getMapper().toAggregate(entity);
  }

  async save(user: User.Property): Promise<User.Property> {
    const { id } = await this.getRepository().save(
      this.getMapper().toRootEntity(user),
    );
    (user as any).id = id;
    return user;
  }
}
