import { HttpExceptionFactory } from '@COMMON/exception/http-exception.factory';
import { throw_if_null } from '@COMMON/util/throw-if-null';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '@USER/domain';
import { UserRepository } from '@USER/infrastructure/adapter/user.repository';
import { IUserRepository } from '@USER/infrastructure/port/user.repository.port';
import { IUserService } from '../port/user.service.port';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async findOne({ id }: IUserService.FindOne): Promise<User.State> {
    return throw_if_null(
      await this.userRepository.findOne({ id }),
      HttpExceptionFactory('NotFound'),
    );
  }
}
