import { Cookie } from '@AUTH/provider/constant/cookie';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUsecaseDTO } from '../dto/auth.usecase.dto';
import { IAuthUsecase } from '../port/auth.usecase.interface';

@Injectable()
export class AuthUsecase implements IAuthUsecase {
  constructor(private readonly jwtSerivce: JwtService) {}

  signIn({ id }: AuthUsecaseDTO.SignIn): AuthUsecaseDTO.SignInResponse {
    const token = this.jwtSerivce.sign({ id });
    return [Cookie.name, token, Cookie.option];
  }
}
