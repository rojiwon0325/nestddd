import { Inject, Injectable } from '@nestjs/common';
import { User } from '../domain/user.aggregate';
import { IUser } from '../domain/user.interface';
import { IUserRepository } from '../domain/repository.interface';
import { UserRepository } from '../infrastructure/user.repository';
import {
  CreateUserDTO,
  FindOneUserDTO,
  RemoveUserDTO,
} from './user.service.dto';
import { httpExceptionProvider } from 'src/api/common/provider/exception.provider';
import { ExceptionMessage } from 'src/api/common/provider/message.provider';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async create(dto: CreateUserDTO): Promise<IUser> {
    const { username } = dto;
    const user = User.get({ username });
    return this.userRepository.save(user);
  }

  async findOne(dto: FindOneUserDTO): Promise<IUser> {
    const user = await this.userRepository.findOne(dto.id);
    if (user == null) {
      throw httpExceptionProvider('404', ExceptionMessage.NotFound);
    }
    return user;
  }

  async remove(dto: RemoveUserDTO): Promise<void> {
    const user = await this.findOne({ id: dto.id });
    return this.userRepository.remove(user);
  }
}
