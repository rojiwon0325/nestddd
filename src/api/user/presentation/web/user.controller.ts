import { Auth } from '@AUTH/domain';
import { AuthPublic } from '@AUTH/provider/decorator/auth-public.decorator';
import { Public } from '@AUTH/provider/decorator/public.decorator';
import {
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserUsecase } from '@USER/application/adapter/user.usecase';
import { IUserUsecase } from '@USER/application/port/user.usecase.port';
import { UserResponseInterceptor } from '@USER/provider/user.interceptor';
import helper from 'nestia-helper';

@UseInterceptors(UserResponseInterceptor)
@Controller('users')
export class UserController {
  constructor(
    @Inject(UserUsecase)
    private readonly usecase: IUserUsecase,
  ) {}

  @Public()
  @Post()
  create(
    @helper.TypedBody() { username, email, password }: IUserUsecase.Create,
  ) {
    return this.usecase.create({ username, email, password });
  }

  @Get('me')
  findMe(@AuthPublic() { id }: Auth.Public) {
    return this.usecase.findMe({ id });
  }

  @Get(':user_id')
  findOne(@helper.TypedParam('user_id', 'number') id: number) {
    return this.usecase.findOne({ id });
  }

  @Patch('me')
  update(
    @AuthPublic() { id }: Auth.Public,
    @helper.TypedBody() { username, bio, birth, phone }: IUserUsecase.Update,
  ) {
    return this.usecase.update({ id }, { username, bio, birth, phone });
  }

  @Delete('me')
  async remove(@AuthPublic() { id }: Auth.Public) {
    await this.usecase.remove({ id });
    return { status: '200', message: 'success' };
  }
}
