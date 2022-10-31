import { Body, Controller, Post } from '@nestjs/common';
import { IUserCreateUsecase } from '../../application/port/user.create-usecase.interface';

@Controller('users')
export class UserController {
  constructor(private readonly createUsecase: IUserCreateUsecase) {}

  @Post()
  create(@Body() body: any) {
    return this.createUsecase.execute();
  }
}
