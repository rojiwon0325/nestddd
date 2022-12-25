import { IUserAggregate } from '@INTERFACE/user/domain';
import { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { assert } from 'typia';

export const Profile = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const { id, email, username } = assert<IUserAggregate.Profile>(
      ctx.switchToHttp().getRequest().user,
    );
    return { id, email, username };
  },
);
