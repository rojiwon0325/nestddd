import { AccountUsecase } from '@ACCOUNT/application/adapter/account.usecase';
import { IAccountUsecase } from '@ACCOUNT/application/port/account.usecase.port';
import { Account } from '@ACCOUNT/domain';
import { Cookie } from '@ACCOUNT/provider/constant/cookie';
import { AccountPublic } from '@ACCOUNT/provider/decorator/account.decorator';
import { Public } from '@ACCOUNT/provider/decorator/public.decorator';
import { HttpCode } from '@nestjs/common';
import { Controller, Get, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import helper from 'nestia-helper';

@Controller('accounts')
export class AccountController {
  constructor(
    @Inject(AccountUsecase) private readonly accountUsecase: IAccountUsecase,
  ) {}

  @Public()
  @HttpCode(202)
  @Post('sign-in')
  async signIn(
    @helper.TypedBody() body: IAccountUsecase.SignIn,
    @Res({ passthrough: true }) res: Response,
  ) {
    const [name, token, config] = await this.accountUsecase.signIn(body);
    res.cookie(name, token, config);
    return { status: 200, access_token: token };
  }

  @Public()
  @Post('sign-up')
  signUp(@helper.TypedBody() body: IAccountUsecase.SignUp) {
    return this.accountUsecase.signUp(body);
  }

  @Get('sign-out')
  signOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(Cookie.name);
    return { status: 200, message: 'successed' };
  }

  @Post('withdraw')
  remove(
    @AccountPublic() account: Account.Public,
    @helper.TypedBody() body: IAccountUsecase.SignIn,
  ) {
    return this.accountUsecase.remove(account, body);
  }
}
