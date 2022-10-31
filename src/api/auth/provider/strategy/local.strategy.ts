import { Injectable } from '@nestjs/common';
import {
  IStrategyOptions,
  IStrategyOptionsWithRequest,
  Strategy,
} from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { IAuthResponse } from '../../domain/auth.interface';
import { IAuthValidateService } from '../../application/port/auth.validate-service.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly validateService: IAuthValidateService) {
    const option: IStrategyOptions | IStrategyOptionsWithRequest = {};
    super(option);
  }

  async validate(username: string, password: string): Promise<IAuthResponse> {
    const auth = await this.validateService.execute({ username, password });
    return auth.getResponse();
  }
}
