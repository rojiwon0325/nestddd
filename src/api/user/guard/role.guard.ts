import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { HttpExceptionFactory } from '@COMMON/exception';
import { User } from '../domain';
import { ROLE_KEY } from './constant';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const target = this.reflector.getAllAndOverride<User.Permission>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (target == undefined) {
      return true;
    }

    const profile = context.switchToHttp().getRequest().user as
      | User.Profile
      | undefined;

    if (profile == null) {
      throw HttpExceptionFactory('Forbidden');
    }

    // const { role: user } = await this.userService.findOne({ id: profile.id });

    return User.checkPermission({ user: 'Normal', target });
  }
}
