import { Inject, Injectable } from '@nestjs/common';
import { User } from '@USER/domain';
import { IUserRepository } from '@USER/infrastructure/port';
import { IUserService } from '../port';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async findOne(profile: User.Profile): Promise<User.State> {
    const user = await this.userRepository.findOne(profile);
    if (user == null) {
      return this.userRepository.save(User.get(profile));
    }
    return user;
  }

  save(state: User.State): Promise<User.State> {
    return this.userRepository.save(state);
  }

  update(
    { id }: Pick<User.State, 'id'>,
    data: IUserService.UpdateData,
  ): Promise<void> {
    return this.userRepository.update({ id }, data);
  }
}
