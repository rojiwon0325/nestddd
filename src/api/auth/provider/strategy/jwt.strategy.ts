import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { Request } from 'express';
import { Cookie } from '../constant/cookie';
import { AuthDomain } from '@AUTH/domain/auth.interface';
import { throwHttpException } from '@COMMON/provider/exception.provider';
import { IAuthService } from '@AUTH/application/port/auth.service.interface';
import { AuthService } from '@AUTH/application/adapter/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(AuthService) private readonly authService: IAuthService) {
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

  async validate({
    id,
  }: Pick<AuthDomain.Property, 'id'>): Promise<AuthDomain.Public> {
    return typeof id == 'number'
      ? (await this.authService.findOne({ id })).getPublic()
      : throwHttpException('401', '유효하지 않은 인증정보입니다.');
  }
}
