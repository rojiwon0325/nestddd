import { Injectable } from '@nestjs/common';
import { IUser } from '../../domain/user.interface';
import { CreateUserDTO } from '../dto/user.application.dto';
import { IUserCreateUsecase } from '../port/user.create-usecase.interface';

@Injectable()
export class CreateUserUsecase implements IUserCreateUsecase {
  async execute(dto: CreateUserDTO): Promise<IUser> {
    return {} as Promise<IUser>;
  }
}
