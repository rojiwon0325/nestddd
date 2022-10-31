import { Inject, Injectable } from '@nestjs/common';
import {
  IStrategyOptions,
  IStrategyOptionsWithRequest,
  Strategy,
} from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { IAuthResponse } from '../../domain/auth.interface';
import { AuthService } from '../../application/adapter/auth.service';
import { IAuthService } from '../../application/port/auth.service.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(AuthService) private readonly authService: IAuthService) {
    const option: IStrategyOptions | IStrategyOptionsWithRequest = {};
    super(option);
  }

  async validate(username: string, password: string): Promise<IAuthResponse> {
    const auth = await this.authService.validate({ username, password });
    return auth.getResponse();
  }
}
