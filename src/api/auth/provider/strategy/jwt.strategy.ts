import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IAuthId, IAuthResponse } from '../../domain/auth.interface';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { IAuthFindOneService } from '../../application/port/auth.findOne-service.interface';
import { Request } from 'express';
import { Auth } from '../../domain/auth.aggregate';
import { httpExceptionProvider } from 'src/api/common/provider/exception.provider';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly findOneService: IAuthFindOneService) {
    const option: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req: Request) => req.cookies[Auth.getCookieName()] ?? null,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    };
    super(option);
  }

  async validate({ id }: { id: IAuthId }): Promise<IAuthResponse> {
    if (typeof id == 'number') {
      const auth = await this.findOneService.execute({ id });
      return auth.getResponse();
    }
    throw httpExceptionProvider('401', '유효하지 않은 인증정보입니다.');
  }
}
