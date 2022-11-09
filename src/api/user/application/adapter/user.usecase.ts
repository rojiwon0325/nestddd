import { AuthService } from '@AUTH/application/adapter/auth.service';
import { IAuthService } from '@AUTH/application/port/auth.service.port';
import { Crypto } from '@CRYPTO/domain';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '@USER/domain';
import { UserRepository } from '@USER/infrastructure/adapter/user.repository';
import { IUserRepository } from '@USER/infrastructure/port/user.repository.port';
import { IUserService } from '../port/user.service.port';
import { IUserUsecase } from '../port/user.usecase.port';
import { UserService } from './user.service';

@Injectable()
export class UserUsecase implements IUserUsecase {
  constructor(
    @Inject(AuthService)
    private readonly authService: IAuthService,
    @Inject(UserService)
    private readonly userService: IUserService,
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async findOne({ id }: IUserUsecase.FindOne): Promise<User.Profile> {
    return User.getProfile(await this.userService.findOne({ id }));
  }

  async findMe({ id }: IUserUsecase.FindOne): Promise<User.ProfileDetail> {
    return User.getProfileDetail(await this.userService.findOne({ id }));
  }

  async create({
    username,
    email,
    password,
  }: IUserUsecase.Create): Promise<User.ProfileDetail> {
    await this.authService.checkDuplicate({ email });

    const hashed = await Crypto.encrypt(password);
    return User.getProfileDetail(
      await this.userRepository.save(
        User.get({ email, username, password: hashed }),
      ),
    );
  }

  async update(
    { id }: IUserUsecase.FindOne,
    { username, bio, birth, phone }: IUserUsecase.Update,
  ): Promise<User.ProfileDetail> {
    const user = await this.userService.findOne({ id });
    if (username) User.setUsername(user, { username });
    User.setMetadata(user, {
      ...(bio ? { bio } : {}),
      ...(birth ? { birth } : {}),
      ...(phone ? { phone } : {}),
    });
    return User.getProfileDetail(await this.userRepository.save(user));
  }

  remove({ id }: IUserUsecase.FindOne): Promise<void> {
    return this.userRepository.remove({ id });
  }
}
