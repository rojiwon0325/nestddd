import { throwHttpException } from '@COMMON/provider/exception.provider';
import { ExceptionMessage } from '@COMMON/provider/message.provider';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '@USER/domain';
import { UserRepository } from '@USER/infrastructure/adapter/user.repository';
import { IUserRepository } from '@USER/infrastructure/port/user.repository.port';
import { IUserService } from '../port/user.service.port';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: IUserRepository,
  ) {}

  async findOne(account: IUserService.FindOne): Promise<User.Property> {
    const user = await this.userRepository.findOne({ account });
    return user == null
      ? throwHttpException('404', ExceptionMessage.NotFound)
      : user;
  }
}
