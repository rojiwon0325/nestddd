import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ROLE_KEY } from '../constant/role.key';
import { IAuthService } from '@AUTH/application/port/auth.service.port';
import { Auth } from '@AUTH/domain';
import { AuthService } from '@AUTH/application/adapter/auth.service';
import { HttpExceptionFactory } from '@COMMON/exception';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(AuthService)
    private readonly authService: IAuthService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const permission = this.reflector.getAllAndOverride<Auth.Permission>(
      ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (permission == undefined) {
      return true;
    }

    const auth = context.switchToHttp().getRequest().user as
      | Auth.Public
      | undefined;

    if (auth == null) {
      throw HttpExceptionFactory('Forbidden');
    }

    this.authService.checkPermission({ user: auth.role, permission });

    return true;
  }
}
