import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserRole } from '@USER/domain/user.enum';
import { AuthDomain } from '@AUTH/domain/auth.interface';
import { IAuthService } from '@AUTH/application/port/auth.service.interface';
import { throwHttpException } from '@COMMON/provider/exception.provider';
import { ExceptionMessage } from '@COMMON/provider/message.provider';
import { AuthService } from '@AUTH/application/adapter/auth.service';
import { ROLE_KEY } from '../constant/role.key';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(AuthService)
    private readonly authService: IAuthService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const permission = this.reflector.getAllAndOverride<UserRole>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (permission == undefined) {
      return true;
    }

    const user = context.switchToHttp().getRequest().user as
      | AuthDomain.Public
      | undefined;

    return user == undefined ||
      !this.authService.checkPermission({ user: user.role, permission })
      ? throwHttpException('403', ExceptionMessage.FBD)
      : true;
  }
}
