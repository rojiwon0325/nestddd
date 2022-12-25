import { IUserService, IUserUsecase } from '@INTERFACE/user/application';
import { IUserAggregate } from '@INTERFACE/user/domain';
import { Inject, Injectable } from '@nestjs/common';
import { UserAggregate } from '@USER/domain';

@Injectable()
export class UserUsecase implements IUserUsecase {
  constructor(
    @Inject(IUserService)
    private readonly userService: IUserService,
  ) {}

  async me(profile: IUserAggregate.Profile): Promise<IUserAggregate.Public> {
    return UserAggregate.getPublic(await this.userService.findOne(profile));
  }

  async setRole(
    profile: IUserAggregate.Profile,
    { role }: Pick<IUserAggregate.State, 'role'>,
  ): Promise<void> {
    const user = await this.userService.findOne(profile);
    await this.userService.save(UserAggregate.setRole(user, role));
    return;
  }

  remove({ id }: IUserAggregate.Profile): Promise<void> {
    return this.userService.remove({ id });
  }
}
