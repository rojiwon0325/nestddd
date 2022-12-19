import { Injectable } from '@nestjs/common';
import { User } from '@USER/domain';
import { IUserService } from '../port';

@Injectable()
export class UserService implements IUserService {
  async findOne(filter: Pick<User.State, 'id'>): Promise<User.State> {
    throw Error();
  }
  async save(agg: User.State): Promise<User.State> {
    throw Error();
  }
  async update(
    filter: Pick<User.State, 'id'>,
    data: IUserService.UpdateData,
  ): Promise<void> {
    return;
  }
}
