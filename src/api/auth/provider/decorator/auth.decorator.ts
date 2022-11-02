import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthPublic = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().user;
  },
);
