import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { httpExceptionProvider } from 'src/api/common/provider/exception.provider';
import { ExceptionMessage } from 'src/api/common/provider/message.provider';
import { IUser } from '../../domain/user.interface';
import { UserRepository } from '../../infrastructure/adapter/user.repository';
import { UserErrorMessage } from '../../infrastructure/model/user.entity';
import { IUserRepository } from '../../infrastructure/port/user.repository.interface';
import { FindOneUserDTO } from '../dto/user.application.dto';
import { IUserService } from '../port/user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: IUserRepository,
  ) {}

  async checkDuplicate(username: string): Promise<void> {
    const exist = await this.userRepository.findOne({ username });
    if (exist != null) {
      throw httpExceptionProvider('400', UserErrorMessage.username_unique);
    }
    return;
  }

  encrypt(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async findOne(dto: FindOneUserDTO): Promise<IUser> {
    const user = await this.userRepository.findOne(dto);
    if (user == null) {
      throw httpExceptionProvider('404', ExceptionMessage.NotFound);
    }
    return user;
  }
}
