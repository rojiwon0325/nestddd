import { Injectable } from '@nestjs/common';
import { IEntityMapper } from 'src/api/common/interface/mapper.interface';
import { UserEntity } from 'src/api/user/infrastructure/model/user.entity';
import { Auth } from '../../domain/auth.aggregate';
import { IAuth } from '../../domain/auth.interface';

@Injectable()
export class AuthMapper implements IEntityMapper<IAuth, UserEntity> {
  toAggregate(entity: UserEntity): IAuth {
    const { id, created_at, updated_at, username, password, role } = entity;
    return Auth.get({ id, created_at, updated_at, username, password, role });
  }

  toRootEntity(auth: IAuth): UserEntity {
    const { id } = auth;
    const entity = new UserEntity();
    if (id != 0) {
      entity.id = id;
    }
    return entity;
  }
}
