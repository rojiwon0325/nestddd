import { AuthUsecase } from '@AUTH/application/adapter/auth.usecase';
import { IAuthUsecase } from '@AUTH/application/port/auth.usecase.port';
import { Cookie } from '@AUTH/provider/constant/cookie';
import { Public } from '@AUTH/provider/decorator/public.decorator';
import { IResponse } from '@COMMON/interface';
import { Controller, Get, HttpCode, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import helper from 'nestia-helper';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthUsecase)
    private readonly usecase: IAuthUsecase,
  ) {}

  /**
   * 사용자 로그인 API
   * @tag auth
   * @tag public
   * @throw 404 존재하지 않는 사용자인 경우
   * @throw 400 비밀번호가 일치하지 않거나 이메일 인증이 완료되지 않은 경우
   * @param body 로그인에 사용되는 이메일과 비밀번호를 포함한다
   * @returns access_token 전달, 해당 토큰은 쿠키에도 저장됨
   */
  @Public()
  @Post('sign-in')
  @HttpCode(202)
  async signIn(
    @helper.TypedBody() body: IAuthUsecase.SignIn,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, password } = body;
    const [name, token, config] = await this.usecase.signIn({
      email,
      password,
    });
    res.cookie(name, token, config);
    return { status: 202, access_token: token };
  }

  /**
   * 로그아웃 API
   * 사용자 쿠키에 있는 토큰을 제거한다.
   * 추후에 별도의 인증서버를 연동할 경우, 해당 인증서버에 로그아웃 요청을 보낸다.
   * @tag auth
   */
  @Get('sign-out')
  signOut(@Res({ passthrough: true }) res: Response): IResponse {
    res.clearCookie(Cookie.name);
    return { statusCode: 200, message: 'successed' };
  }
}
