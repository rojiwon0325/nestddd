import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth } from '../../domain/auth.aggregate';
import { IAuthId } from '../../domain/auth.interface';
import { ISignInResponse } from '../dto/auth.application.dto';
import { IAuthUsecase } from '../port/auth.usecase.interface';

@Injectable()
export class AuthUsecase implements IAuthUsecase {
  constructor(private readonly jwtSerivce: JwtService) {}

  signIn(id: IAuthId): ISignInResponse {
    const token = this.jwtSerivce.sign({ id });
    return [Auth.getCookieName(), token, Auth.getCookieConfig()];
  }
}
