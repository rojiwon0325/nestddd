import { throwHttpException } from '@COMMON/provider/exception.provider';
import { ExceptionMessage } from '@COMMON/provider/message.provider';
import { Inject, Injectable } from '@nestjs/common';
import { UserDomain } from '@USER/domain/user.interface';
import { UserRepository } from '@USER/infrastructure/adapter/user.repository';
import { UserErrorMessage } from '@USER/infrastructure/model/user.entity';
import { IUserRepository } from '@USER/infrastructure/port/user.repository.interface';
import * as bcrypt from 'bcrypt';
import { UserServiceDTO } from '../dto/user.service.dto';
import { IUserService } from '../port/user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: IUserRepository,
  ) {}

  async checkDuplicate(username: string): Promise<void> {
    const exist = await this.userRepository.findOne({ username });
    return exist != null
      ? throwHttpException('400', UserErrorMessage.username_unique)
      : undefined;
  }

  encrypt(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async findOne(dto: UserServiceDTO.FindOne): Promise<UserDomain.Aggregate> {
    const user = await this.userRepository.findOne(dto);
    return user == null
      ? throwHttpException('404', ExceptionMessage.NotFound)
      : user;
  }
}
