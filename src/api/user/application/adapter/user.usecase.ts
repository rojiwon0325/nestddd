import { AuthService } from '@AUTH/application/adapter/auth.service';
import { AuthServiceDTO } from '@AUTH/application/dto/auth.service.dto';
import { IAuthService } from '@AUTH/application/port/auth.service.interface';
import { AuthDomain } from '@AUTH/domain/auth.interface';
import { throwHttpException } from '@COMMON/provider/exception.provider';
import { ExceptionMessage } from '@COMMON/provider/message.provider';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '@USER/domain/user.aggregate';
import { UserDomain } from '@USER/domain/user.interface';
import { UserRepository } from '@USER/infrastructure/adapter/user.repository';
import { IUserRepository } from '@USER/infrastructure/port/user.repository.interface';
import { UserUsecaseDTO } from '../dto/user.usecase.dto';
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

  async create(dto: UserUsecaseDTO.Create): Promise<UserDomain.Public> {
    const { username, password } = dto;
    await this.userService.checkDuplicate(username);
    const encrypted = await this.userService.encrypt(password);
    const user = User.get({ username });
    return (await this.userRepository.save(user, encrypted)).getPublic();
  }

  async findOne(where: UserUsecaseDTO.FindOne): Promise<UserDomain.Public> {
    return (await this.userService.findOne(where)).getPublic();
  }

  async findMe({ id }: AuthDomain.Public): Promise<UserDomain.PublicDetail> {
    return (await this.userService.findOne({ id })).getPublicDetail();
  }

  async findMany(): Promise<UserDomain.Public[]> {
    return (await this.userRepository.findMany()).map((user) =>
      user.getPublic(),
    );
  }

  async update(
    { id }: AuthDomain.Public,
    dto: UserUsecaseDTO.Update,
  ): Promise<UserDomain.Public> {
    const user = await this.userService.findOne({ id });
    const { username } = dto;
    username != undefined ? user.setUsername(username) : undefined;
    return (await this.userRepository.save(user)).getPublic();
  }

  async remove(
    auth: AuthDomain.Public,
    validate: AuthServiceDTO.Validate,
  ): Promise<UserUsecaseDTO.RemoveResponse> {
    auth.username !== validate.username
      ? throwHttpException('403', ExceptionMessage.FBD)
      : undefined;
    const { id } = await this.authService.validate(validate);
    await this.userRepository.remove({ id });
    return { id };
  }
}
