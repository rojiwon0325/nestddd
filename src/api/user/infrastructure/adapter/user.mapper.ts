import { IEntityMapper } from '@COMMON/interface/mapper.interface';
import { Injectable } from '@nestjs/common';
import { User } from '@USER/domain';
import { UserEntity } from './user.entity';

@Injectable()
export class UserEntityMapper implements IEntityMapper<User.State, UserEntity> {
  toAggregate(entity: UserEntity): User.State {
    return User.get({
      ...entity,
      metadata: { ...entity },
    });
  }
  toRootEntity(aggregate: User.State): UserEntity {
    const {
      id,
      username,
      email,
      verified,
      role,
      password,
      metadata: { bio, birth, phone },
    } = aggregate;
    const entity = new UserEntity();
    entity.username = username;
    entity.email = email;
    entity.verified = verified;
    entity.role = role;
    entity.password = password;
    if (id) entity.id = id;
    if (bio) entity.bio = bio;
    if (birth) entity.birth = birth;
    if (phone) entity.phone = phone;
    return entity;
  }
}
