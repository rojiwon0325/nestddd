import { IEntityMapper } from '@COMMON/interface/mapper.interface';
import { Injectable } from '@nestjs/common';
import { User } from '@USER/domain/user.aggregate';
import { UserDomain } from '@USER/domain/user.interface';
import { UserEntity } from '../model/user.entity';

@Injectable()
export class UserEntityMapper
  implements IEntityMapper<UserDomain.Aggregate, UserEntity>
{
  toAggregate(entity: UserEntity): UserDomain.Aggregate {
    const { id, created_at, updated_at, username, role } = entity;
    return User.get({ id, created_at, updated_at, username, role });
  }
  toRootEntity(aggregate: UserDomain.Aggregate): UserEntity {
    const { id, username, role } = aggregate;
    const entity = new UserEntity();
    if (id != 0) {
      entity.id = id;
    }
    entity.username = username;
    entity.role = role;
    return entity;
  }
}
