import { AuthUsecase } from '@AUTH/application/adapter/auth.usecase';
import { IAuthUsecase } from '@AUTH/application/port/auth.usecase.interface';
import { AuthDomain } from '@AUTH/domain/auth.interface';
import { Cookie } from '@AUTH/provider/constant/cookie';
import { AuthPublic } from '@AUTH/provider/decorator/auth.decorator';
import { Public } from '@AUTH/provider/decorator/public.decorator';
import { Controller, Get, Inject, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthUsecase) private readonly authUsecase: IAuthUsecase,
  ) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('sign-in')
  create(
    @AuthPublic() { id }: AuthDomain.Public,
    @Res({ passthrough: true }) res: Response,
  ) {
    const [name, token, config] = this.authUsecase.signIn({ id });
    res.cookie(name, token, config).status(200);
    return { status: 200, access_token: token };
  }

  @Get('sign-out')
  signout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(Cookie.name);
    return { status: 200, message: 'successed' };
  }
}
