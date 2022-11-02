import { AuthDomain } from '@AUTH/domain/auth.interface';
import { IEntityMapper } from '@COMMON/interface/mapper.interface';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@USER/infrastructure/model/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { IAuthRepository } from '../port/auth.repository.interface';
import { AuthMapper } from './auth.mapper';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @Inject(AuthMapper)
    private readonly mapper: IEntityMapper<AuthDomain.Aggregate, UserEntity>,
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findOne(
    where:
      | Pick<AuthDomain.Property, 'id'>
      | Pick<AuthDomain.Property, 'username'>,
  ): Promise<AuthDomain.Aggregate | null> {
    const option: FindOneOptions<UserEntity> = { where };
    const entity = await this.repository.findOne(option);
    return entity == null ? null : this.mapper.toAggregate(entity);
  }
}
