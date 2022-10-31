import { Injectable } from '@nestjs/common';
import { IEntityMapper } from 'src/api/common/interface/mapper.interface';
import { User } from '../domain/user.aggregate';
import { IUser } from '../../user/domain/user.interface';
import { UserEntity } from './user.entity';

@Injectable()
export class UserEntityMapper implements IEntityMapper<IUser, UserEntity> {
  toAggregate(entity: UserEntity): IUser {
    const { id, created_at, updated_at, username } = entity;
    return User.get({ id, username, created_at, updated_at });
  }
  toRootEntity(aggregate: IUser): UserEntity {
    const { id, username } = aggregate;
    const entity = new UserEntity();
    if (id != 0) {
      entity.id = id;
    }
    entity.username = username;
    return entity;
  }
}
