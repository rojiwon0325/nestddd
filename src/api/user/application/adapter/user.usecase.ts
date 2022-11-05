import { AccountService } from '@ACCOUNT/application/adapter/account.service';
import { IAccountService } from '@ACCOUNT/application/port/account.service.port';
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
    @Inject(AccountService) private readonly accountService: IAccountService,
    @Inject(UserRepository) private readonly userRepository: IUserRepository,
    @Inject(UserService) private readonly userService: IUserService,
  ) {}
  async findOne(where: IUserUsecase.FindOne): Promise<User.Public> {
    return User.getPublic(await this.userService.findOne(where));
  }
  async findMe(where: IUserUsecase.FindMe): Promise<User.PublicDetail> {
    return User.getPublicDetail(await this.userService.findOne(where));
  }
  /** account정보에 해당하는 user를 생성한다. 만약 이미 있다면 덮어쓴다.(?) */
  async createProfile(
    where: IUserUsecase.FindMe,
    { bio }: IUserUsecase.CreateProfile,
  ): Promise<User.PublicDetail> {
    return User.getPublicDetail(
      await this.userRepository.save(
        User.get({
          account: await this.accountService.findOne(where),
          profile: { bio },
        }),
      ),
    );
  }
  /** account는 존재하지만 user 정보가 존재하지 않는 경우, NotFound에러를 발생시킨다. */
  async updateProfile(
    where: IUserUsecase.FindMe,
    update: IUserUsecase.UpdateProfile,
  ): Promise<User.PublicDetail> {
    return User.getPublicDetail(
      await this.userRepository.save(
        User.setProfile(await this.userService.findOne(where), update),
      ),
    );
  }

  async updateUsername(
    where: IUserUsecase.FindMe,
    { username }: IUserUsecase.UpdateUsername,
  ): Promise<User.PublicDetail> {
    await this.accountService.checkDuplicate({ username });
    return User.getPublicDetail(
      await this.userRepository.save(
        User.setUsername(await this.userService.findOne(where), { username }),
      ),
    );
  }
}
