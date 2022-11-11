import { if_not_null } from '@COMMON/util';
import { Auth } from '@AUTH/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@USER/infrastructure/adapter/user.entity';
import { Repository } from 'typeorm';
import { IAuthRepository } from '../port/auth.repository.port';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findOne(where: IAuthRepository.FindOne): Promise<Auth.State | null> {
    return if_not_null(await this.repository.findOne({ where }), Auth.get);
  }
}
