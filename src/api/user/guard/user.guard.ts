import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { HttpExceptionFactory } from '@COMMON/exception';
import { PUBLIC_KEY } from './constant';

@Injectable()
export class UserGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    return isPublic ? true : super.canActivate(context);
  }

  handleRequest(err: Error, payload: any) {
    if (err || !payload) {
      throw HttpExceptionFactory('UnAuthorized');
    }
    return payload;
  }
}
