import {
  account_aggregate_to_entity,
  account_entity_to_aggregate,
} from '@ACCOUNT/infrastructure/adapter/account.mapper';
import { IEntityMapper } from '@COMMON/interface/mapper.interface';
import { Injectable } from '@nestjs/common';
import { User } from '@USER/domain';
import { UserEntity } from './user.entity';

@Injectable()
export class UserEntityMapper
  implements IEntityMapper<User.Property, UserEntity>
{
  toAggregate(entity: UserEntity): User.Property {
    const { id, created_at, updated_at, bio, account } = entity;
    return User.get({
      id,
      created_at,
      updated_at,
      profile: { bio },
      account: account_entity_to_aggregate(account),
    });
  }
  toRootEntity(aggregate: User.Property): UserEntity {
    const { id, profile, account } = aggregate;
    const entity = new UserEntity();
    if (id != 0) {
      entity.id = id;
    }
    entity.bio = profile.bio ?? '';
    entity.account = account_aggregate_to_entity(account);
    return entity;
  }
}
