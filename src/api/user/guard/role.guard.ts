import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { HttpExceptionFactory } from '@COMMON/exception';

import { ROLE_KEY } from './constant';
import { IUserService } from '@INTERFACE/user/application';
import { IUserAggregate } from '@INTERFACE/user/domain';
import { UserAggregate } from '@USER/domain';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(IUserService)
    private readonly userService: IUserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const target = this.reflector.getAllAndOverride<IUserAggregate.Permission>(
      ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (target == undefined) {
      return true;
    }

    const profile = context.switchToHttp().getRequest().user as
      | IUserAggregate.Profile
      | undefined;

    if (profile == null) {
      throw HttpExceptionFactory('Forbidden');
    }
    const { role: user } = await this.userService.findOne(profile);

    return UserAggregate.checkPermission({ user, target });
  }
}
