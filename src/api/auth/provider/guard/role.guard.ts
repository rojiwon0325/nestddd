import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserRole } from 'src/api/user/domain/user.enum';
import { ROLE_KEY } from '../constants';
import { IAuthResponse } from '../../domain/auth.interface';
import { httpExceptionProvider } from 'src/api/common/provider/exception.provider';
import { ExceptionMessage } from 'src/api/common/provider/message.provider';
import { Auth } from '../../domain/auth.aggregate';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permission = this.reflector.getAllAndOverride<UserRole>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (permission == undefined) {
      return true;
    }

    const user = context.switchToHttp().getRequest().user as IAuthResponse;

    if (user == undefined || !Auth.checkPermission(user.role, permission)) {
      throw httpExceptionProvider('403', ExceptionMessage.FBD);
    }

    return true;
  }
}
