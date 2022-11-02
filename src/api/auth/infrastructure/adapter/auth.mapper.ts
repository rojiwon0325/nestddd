import { Auth } from '@AUTH/domain/auth.aggregate';
import { AuthDomain } from '@AUTH/domain/auth.interface';
import { IEntityMapper } from '@COMMON/interface/mapper.interface';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@USER/infrastructure/model/user.entity';

@Injectable()
export class AuthMapper
  implements IEntityMapper<AuthDomain.Aggregate, UserEntity>
{
  toAggregate(entity: UserEntity): AuthDomain.Aggregate {
    const { id, created_at, updated_at, username, password, role } = entity;
    return Auth.get({ id, created_at, updated_at, username, password, role });
  }

  toRootEntity(auth: AuthDomain.Aggregate): UserEntity {
    const { id } = auth;
    const entity = new UserEntity();
    if (id != 0) {
      entity.id = id;
    }
    return entity;
  }
}
