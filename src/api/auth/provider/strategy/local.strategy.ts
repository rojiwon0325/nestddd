import { Inject, Injectable } from '@nestjs/common';
import {
  IStrategyOptions,
  IStrategyOptionsWithRequest,
  Strategy,
} from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '@AUTH/application/adapter/auth.service';
import { IAuthService } from '@AUTH/application/port/auth.service.interface';
import { AuthDomain } from '@AUTH/domain/auth.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(AuthService) private readonly authService: IAuthService) {
    const option: IStrategyOptions | IStrategyOptionsWithRequest = {};
    super(option);
  }

  async validate(
    username: string,
    password: string,
  ): Promise<AuthDomain.Public> {
    return (
      await this.authService.validate({ username, password })
    ).getPublic();
  }
}
