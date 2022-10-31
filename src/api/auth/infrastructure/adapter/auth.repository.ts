import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IEntityMapper } from 'src/api/common/interface/mapper.interface';
import { UserEntity } from 'src/api/user/infrastructure/model/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { IAuth } from '../../domain/auth.interface';
import { IAuthRepository } from '../port/auth.repository.interface';
import { AuthMapper } from './auth.mapper';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @Inject(AuthMapper)
    private readonly mapper: IEntityMapper<IAuth, UserEntity>,
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findOne(
    where: { username: string } | { id: number },
  ): Promise<IAuth | null> {
    const option: FindOneOptions<UserEntity> = { where };
    const entity = await this.repository.findOne(option);
    return entity == null ? null : this.mapper.toAggregate(entity);
  }
}
