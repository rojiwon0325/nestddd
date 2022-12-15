import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { Request } from 'express';
import TSON from 'typescript-json';
import { Auth } from '@AUTH/domain';
import { Cookie } from '../constant/cookie';
import { IAuthService } from '@AUTH/application/port/auth.service.port';
import { AuthService } from '@AUTH/application/adapter/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AuthService)
    private readonly authService: IAuthService,
  ) {
    const option: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req: Request) => req.cookies[Cookie.name] ?? null,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      algorithms: ['RS256'],
    };
    super(option);
  }

  async validate(dto: Pick<Auth.State, 'id'>): Promise<any> {
    console.log('check1');
    return dto;

    const { id } = TSON.assert(dto);
    return Auth.getPublic(await this.authService.findOne({ id }));
  }
}
