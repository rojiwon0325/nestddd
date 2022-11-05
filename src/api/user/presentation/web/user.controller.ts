import {
  Controller,
  Get,
  Inject,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserUsecase } from '@USER/application/adapter/user.usecase';
import { UserResponseInterceptor } from '@USER/provider/user.interceptor';
import helper from 'nestia-helper';
import { IUserUsecase } from '@USER/application/port/user.usecase.port';
import { AccountPublic } from '@ACCOUNT/provider/decorator/account.decorator';
import { Account } from '@ACCOUNT/domain';
import { Role } from '@ACCOUNT/provider/decorator/role.decorator';

@UseInterceptors(UserResponseInterceptor)
@Controller('users')
export class UserController {
  constructor(
    @Inject(UserUsecase) private readonly userUsecase: IUserUsecase,
  ) {}

  @Get('me')
  async findMe(@AccountPublic() { id, username, email }: Account.Public) {
    return this.userUsecase.findMe({ id, username, email });
  }

  @Role('Admin')
  @Get(':user_id')
  async findOne(
    @helper.TypedParam('user_id', 'number')
    id: number,
  ) {
    return this.userUsecase.findOne({ id });
  }

  @Post('me')
  async createProfile(
    @AccountPublic() account: Account.Public,
    @helper.TypedBody()
    body: IUserUsecase.CreateProfile,
  ) {
    return this.userUsecase.createProfile(account, body);
  }

  @Patch('me')
  updateProfile(
    @AccountPublic() account: Account.Public,
    @helper.TypedBody() body: IUserUsecase.UpdateProfile,
  ) {
    return this.userUsecase.updateProfile(account, body);
  }
}
