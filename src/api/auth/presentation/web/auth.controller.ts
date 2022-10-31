import { Controller, Get, Inject, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthUsecase } from '../../application/adapter/auth.usecase';
import { IAuthUsecase } from '../../application/port/auth.usecase.interface';
import { Auth } from '../../domain/auth.aggregate';
import { IAuthResponse } from '../../domain/auth.interface';
import { AuthUser } from '../../provider/decorator/auth.decorator';
import { Public } from '../../provider/decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthUsecase) private readonly authUsecase: IAuthUsecase,
  ) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('sign-in')
  create(
    @AuthUser() { id }: IAuthResponse,
    @Res({ passthrough: true }) res: Response,
  ) {
    const [name, token, config] = this.authUsecase.signIn(id);
    res.cookie(name, token, config);
    return { status: 200, access_token: token };
  }

  @Get('sign-out')
  signout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(Auth.getCookieName());
    return { status: 200, message: 'successed' };
  }
}
