import { IUserService } from '@INTERFACE/user/application';
import { IUserAggregate } from '@INTERFACE/user/domain';
import { IUserRepository } from '@INTERFACE/user/infrastructure';
import { Inject, Injectable } from '@nestjs/common';
import { UserAggregate } from '@USER/domain';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async findOne(
    profile: IUserAggregate.Profile,
  ): Promise<IUserAggregate.State> {
    const user = await this.userRepository.findOne(profile);
    if (user == null) {
      return this.userRepository.save(UserAggregate.get(profile));
    }
    return user;
  }

  save(state: IUserAggregate.State): Promise<IUserAggregate.State> {
    return this.userRepository.save(state);
  }

  update(
    { id }: Pick<IUserAggregate.State, 'id'>,
    data: IUserService.UpdateData,
  ): Promise<void> {
    return this.userRepository.update({ id }, data);
  }

  remove({ id }: Pick<IUserAggregate.State, 'id'>): Promise<void> {
    return this.userRepository.remove({ id });
  }
}
