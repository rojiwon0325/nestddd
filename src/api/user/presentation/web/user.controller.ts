import { AuthDomain } from '@AUTH/domain/auth.interface';
import { AuthPublic } from '@AUTH/provider/decorator/auth.decorator';
import { Public } from '@AUTH/provider/decorator/public.decorator';
import { Role } from '@AUTH/provider/decorator/role.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserUsecase } from '@USER/application/adapter/user.usecase';
import { IUserUsecase } from '@USER/application/port/user.usecase.interface';
import { UserRole } from '@USER/domain/user.enum';
import { UserResponseInterceptor } from '@USER/provider/user.interceptor';
import { UpdateUserBody, ValidateUserBody } from './user.controller.dto';

@UseInterceptors(UserResponseInterceptor)
@Controller('users')
export class UserController {
  constructor(
    @Inject(UserUsecase) private readonly userUsecase: IUserUsecase,
  ) {}

  @Public()
  @Post()
  create(@Body() body: ValidateUserBody) {
    const { username, password } = body;
    return this.userUsecase.create({ username, password });
  }

  @Role(UserRole.Admin)
  @Get()
  findMany() {
    return this.userUsecase.findMany();
  }

  @Get('me')
  async findMe(@AuthPublic() auth: AuthDomain.Public) {
    return this.userUsecase.findMe(auth);
  }

  @Role(UserRole.Admin)
  @Get(':user_id')
  async findOne(@Param('user_id') id: number) {
    return this.userUsecase.findOne({ id });
  }

  @Patch('me')
  update(@AuthPublic() auth: AuthDomain.Public, @Body() body: UpdateUserBody) {
    const { username } = body;
    return this.userUsecase.update(auth, { username });
  }

  @Delete('me')
  remove(
    @AuthPublic() auth: AuthDomain.Public,
    @Body() body: ValidateUserBody,
  ) {
    const { username, password } = body;
    return this.userUsecase.remove(auth, { username, password });
  }
}
