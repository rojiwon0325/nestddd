import { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { assert } from 'typia';
import { User } from '../domain';

export const Profile = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const { id, email, username } = assert<User.Profile>(
      ctx.switchToHttp().getRequest().user,
    );
    return { id, email, username };
  },
);
