import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { Request } from 'express';
import { Cookie } from '../constant/cookie';
import TSON from 'typescript-json';
import { Account } from '@ACCOUNT/domain';
import { AccountService } from '@ACCOUNT/application/adapter/account.service';
import { IAccountService } from '@ACCOUNT/application/port/account.service.port';

type JwtPayload = Pick<Account.Property, 'id'>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AccountService) private readonly accountService: IAccountService,
  ) {
    const option: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req: Request) => req.cookies[Cookie.name] ?? null,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    };
    super(option);
  }

  async validate(dto: JwtPayload): Promise<Account.Public> {
    const { id } = TSON.assertType(dto);
    return Account.getPublic(await this.accountService.findOne({ id }));
  }
}
