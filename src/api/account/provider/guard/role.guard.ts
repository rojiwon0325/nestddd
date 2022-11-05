import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { throwHttpException } from '@COMMON/provider/exception.provider';
import { ExceptionMessage } from '@COMMON/provider/message.provider';
import { ROLE_KEY } from '../constant/role.key';
import { IAccountService } from '@ACCOUNT/application/port/account.service.port';
import { AccountService } from '@ACCOUNT/application/adapter/account.service';
import { Account } from '@ACCOUNT/domain';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(AccountService)
    private readonly accountService: IAccountService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const permission = this.reflector.getAllAndOverride<Account.Permission>(
      ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (permission == undefined) {
      return true;
    }

    const account = context.switchToHttp().getRequest().user as
      | Account.Public
      | undefined;

    if (account == undefined) {
      throwHttpException('403', ExceptionMessage.FBD);
    } else {
      this.accountService.checkPermission({ user: account.role, permission });
    }
    return true;
  }
}
