import { map } from '@COMMON/util';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@USER/domain';
import { Repository } from 'typeorm';
import { UserEntity } from '../model/user.entity';
import { IUserRepository } from '../port';
import { aggregate_to_entity, entity_to_aggregate } from './user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findOne(profile: User.Profile): Promise<User.State | null> {
    return map(
      await this.repository.findOne({
        where: { id: profile.id },
      }),
      entity_to_aggregate(profile),
    );
  }

  async save(state: User.State): Promise<User.State> {
    return entity_to_aggregate(state)(
      await this.repository.save(aggregate_to_entity(state)),
    );
  }

  async update(
    { id }: Pick<User.State, 'id'>,
    data: Partial<Pick<User.State, 'role'>>,
  ): Promise<void> {
    await this.repository.update(id, data);
    return;
  }

  async remove({ id }: Pick<User.State, 'id'>): Promise<void> {
    await this.repository.softDelete(id);
    return;
  }
}
