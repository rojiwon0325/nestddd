import { map } from '@COMMON/util';
import { IUserAggregate } from '@INTERFACE/user/domain';
import { IUserRepository } from '@INTERFACE/user/infrastructure';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { aggregate_to_entity, entity_to_aggregate } from './user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findOne(
    profile: IUserAggregate.Profile,
  ): Promise<IUserAggregate.State | null> {
    const user = await this.repository
      .createQueryBuilder('user')
      .withDeleted()
      .where('user.id = :id', { id: profile.id })
      .getOne(); // soft-delete된 데이터도 불러온다.
    if (user?.deleted_at != null) {
      await this.repository.restore(user.id);
    }
    return map(user, entity_to_aggregate(profile));
  }

  async save(state: IUserAggregate.State): Promise<IUserAggregate.State> {
    return entity_to_aggregate(state)(
      await this.repository.save(aggregate_to_entity(state)),
    );
  }

  async update(
    { id }: Pick<IUserAggregate.State, 'id'>,
    data: Partial<Pick<IUserAggregate.State, 'role'>>,
  ): Promise<void> {
    await this.repository.update({ id, deleted_at: IsNull() }, data); // soft-deleted entity는 update하지 않는다.
    return;
  }

  async remove({ id }: Pick<IUserAggregate.State, 'id'>): Promise<void> {
    await this.repository.softDelete(id);
    return;
  }
}
