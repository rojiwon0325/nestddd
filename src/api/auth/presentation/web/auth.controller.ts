import { AuthUsecase } from '@AUTH/application/adapter/auth.usecase';
import { IAuthUsecase } from '@AUTH/application/port/auth.usecase.port';
import { Cookie } from '@AUTH/provider/constant/cookie';
import { Controller, Get, HttpCode, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import helper from 'nestia-helper';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthUsecase)
    private readonly usecase: IAuthUsecase,
  ) {}

  @Post('sign-in')
  @HttpCode(202)
  async signIn(
    @helper.TypedBody() { email, password }: IAuthUsecase.SignIn,
    @Res({ passthrough: true }) res: Response,
  ) {
    const [name, token, config] = await this.usecase.signIn({
      email,
      password,
    });
    res.cookie(name, token, config);
    return { status: 202, access_token: token };
  }

  @Get('sign-out')
  signOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(Cookie.name);
    return { status: 200, message: 'successed' };
  }
}
