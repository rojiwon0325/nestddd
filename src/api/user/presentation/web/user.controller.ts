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
import { IAuthResponse } from 'src/api/auth/domain/auth.interface';
import { AuthUser } from 'src/api/auth/provider/decorator/auth.decorator';
import { Public } from 'src/api/auth/provider/decorator/public.decorator';
import { Role } from 'src/api/auth/provider/decorator/role.decorator';
import { UserUsecase } from '../../application/adapter/user.usecase';
import { IUserUsecase } from '../../application/port/user.usecase.interface';
import { UserRole } from '../../domain/user.enum';
import { UserResponseInterceptor } from '../../provider/user.interceptor';
import {
  CreateUserBody,
  FindOneUserParam,
  RemoveUserBody,
  UpdateUserBody,
} from './user.controller.dto';

@UseInterceptors(UserResponseInterceptor)
@Controller('users')
export class UserController {
  constructor(
    @Inject(UserUsecase) private readonly userUsecase: IUserUsecase,
  ) {}

  @Public()
  @Post()
  create(@Body() body: CreateUserBody) {
    const { username, password } = body;
    return this.userUsecase.create({ username, password });
  }

  @Role(UserRole.Admin)
  @Get()
  findMany() {
    return this.userUsecase.findMany();
  }

  @Get('me')
  async findMe(@AuthUser() auth: IAuthResponse) {
    return this.userUsecase.findMe(auth);
  }

  @Role(UserRole.Admin)
  @Get(':user_id')
  async findOne(@Param() { user_id: id }: FindOneUserParam) {
    return this.userUsecase.findOne({ id });
  }

  @Patch('me')
  update(@AuthUser() auth: IAuthResponse, @Body() body: UpdateUserBody) {
    const { username } = body;
    return this.userUsecase.update(auth, { username });
  }

  @Delete('me')
  remove(@AuthUser() auth: IAuthResponse, @Body() body: RemoveUserBody) {
    const { username, password } = body;
    return this.userUsecase.remove(auth, { username, password });
  }
}
