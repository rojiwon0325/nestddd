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
import { IUserService } from '@USER/application/port';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(IUserService)
    private readonly userService: IUserService,
  ) {}

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
    const { role: user } = await this.userService.findOne(profile);

    return User.checkPermission({ user, target });
  }
}
