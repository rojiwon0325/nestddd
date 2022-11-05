import { Account } from '@ACCOUNT/domain';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import TSON from 'typescript-json';

export const AccountPublic = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    return TSON.assertEquals<Account.Public>(
      ctx.switchToHttp().getRequest().user,
    );
  },
);
