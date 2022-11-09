import { Auth } from '@AUTH/domain';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import TSON from 'typescript-json';

export const AuthPublic = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    return TSON.assertEquals<Auth.Public>(ctx.switchToHttp().getRequest().user);
  },
);
