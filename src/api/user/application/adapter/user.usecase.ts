import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/api/auth/application/adapter/auth.service';
import { ValidateAuthDTO } from 'src/api/auth/application/dto/auth.application.dto';
import { IAuthService } from 'src/api/auth/application/port/auth.service.interface';
import { IAuthResponse } from 'src/api/auth/domain/auth.interface';
import { httpExceptionProvider } from 'src/api/common/provider/exception.provider';
import { ExceptionMessage } from 'src/api/common/provider/message.provider';
import { User } from '../../domain/user.aggregate';
import { IUserResponse } from '../../domain/user.interface';
import { UserRepository } from '../../infrastructure/adapter/user.repository';
import { IUserRepository } from '../../infrastructure/port/user.repository.interface';
import {
  CreateUserDTO,
  FindOneUserDTO,
  RemoveUserResponse,
  UpdateUserDTO,
} from '../dto/user.application.dto';
import { IUserService } from '../port/user.service.interface';
import { IUserUsecase } from '../port/user.usecase.interface';
import { UserService } from './user.service';

@Injectable()
export class UserUsecase implements IUserUsecase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: IUserRepository,
    @Inject(UserService) private readonly userService: IUserService,
    @Inject(AuthService) private readonly authService: IAuthService,
  ) {}

  async create(dto: CreateUserDTO): Promise<IUserResponse> {
    const { username, password } = dto;
    await this.userService.checkDuplicate(username);
    const encrypted = await this.userService.encrypt(password);
    const user = User.get({ username });
    return (await this.userRepository.save(user, encrypted)).getResponse();
  }

  async findOne(dto: FindOneUserDTO): Promise<IUserResponse> {
    const user = await this.userService.findOne(dto);
    return user.getResponse();
  }

  async findMe({ id }: IAuthResponse): Promise<IUserResponse> {
    return (await this.userService.findOne({ id })).getResponse();
  }

  async findMany(): Promise<IUserResponse[]> {
    const users = await this.userRepository.findMany();
    return users.map((user) => user.getResponse());
  }

  async update(
    { id }: IAuthResponse,
    dto: UpdateUserDTO,
  ): Promise<IUserResponse> {
    const user = await this.userService.findOne({ id });
    dto.username != undefined ? user.setUsername(dto.username) : undefined;
    return (await this.userRepository.save(user)).getResponse();
  }

  async remove(
    auth: IAuthResponse,
    validate: ValidateAuthDTO,
  ): Promise<RemoveUserResponse> {
    if (auth.username !== validate.username) {
      throw httpExceptionProvider('403', ExceptionMessage.FBD);
    }
    const { id } = await this.authService.validate(validate);
    await this.userRepository.remove(id);
    return { id };
  }
}
