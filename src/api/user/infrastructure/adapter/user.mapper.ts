import { Injectable } from '@nestjs/common';
import { IEntityMapper } from 'src/api/common/interface/mapper.interface';
import { User } from '../../domain/user.aggregate';
import { IUser } from '../../domain/user.interface';
import { UserEntity } from '../model/user.entity';

@Injectable()
export class UserEntityMapper implements IEntityMapper<IUser, UserEntity> {
  toAggregate(entity: UserEntity): IUser {
    const { id, created_at, updated_at, username, role } = entity;
    return User.get({ id, created_at, updated_at, username, role });
  }
  toRootEntity(aggregate: IUser): UserEntity {
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
