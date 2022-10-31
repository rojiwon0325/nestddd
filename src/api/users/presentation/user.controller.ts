import { IUser, IUserResponse } from '../../user/domain/user.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../application/user.service';
import {
  CreateUserBody,
  FindOneUserParam,
  RemoveUserResponse,
} from './user.controller.dto';
import { UserResponseInterceptor } from '../../user/provider/user.interceptor';

@UseInterceptors(UserResponseInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':user_id')
  async findOne(
    @Param() { user_id: id }: FindOneUserParam,
  ): Promise<IUserResponse> {
    const user = await this.userService.findOne({ id });
    return user.getResponse();
  }

  @Post()
  async create(@Body() body: CreateUserBody): Promise<IUser> {
    const { username } = body;
    const user = await this.userService.create({ username });
    return user;
  }

  @Delete(':user_id')
  async remove(
    @Param() { user_id: id }: FindOneUserParam,
  ): Promise<RemoveUserResponse> {
    await this.userService.remove({ id });
    return { id };
  }
}
