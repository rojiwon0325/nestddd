import { Inject, Injectable } from '@nestjs/common';
import { User } from '@USER/domain';
import { IUserService, IUserUsecase } from '../port';

@Injectable()
export class UserUsecase implements IUserUsecase {
  constructor(
    @Inject(IUserService)
    private readonly userService: IUserService,
  ) {}

  async me(profile: User.Profile): Promise<User.Public> {
    return User.getPublic(await this.userService.findOne(profile));
  }

  async setRole(
    profile: User.Profile,
    { role }: Pick<User.State, 'role'>,
  ): Promise<void> {
    const user = await this.userService.findOne(profile);
    await this.userService.save(User.setRole(user, role));
    return;
  }
}
