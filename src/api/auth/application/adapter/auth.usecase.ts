import { Cookie } from '@AUTH/provider/constant/cookie';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthService } from '../port/auth.service.port';
import { IAuthUsecase } from '../port/auth.usecase.port';
import { AuthService } from './auth.service';

@Injectable()
export class AuthUsecase implements IAuthUsecase {
  constructor(
    @Inject(AuthService)
    private readonly authService: IAuthService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({
    email,
    password,
  }: IAuthUsecase.SignIn): Promise<IAuthUsecase.SignInResponse> {
    const auth = await this.authService.findOne({ email });

    await this.authService.checkPassword({ password, hashed: auth.password });
    this.authService.checkVerified({ verified: auth.verified });

    const token = this.jwtService.sign({ id: auth.id });
    return [Cookie.name, token, Cookie.option];
  }
}
