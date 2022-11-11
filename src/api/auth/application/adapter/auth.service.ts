import { Inject, Injectable } from '@nestjs/common';
import { throw_if_null } from '@COMMON/util';
import { HttpExceptionFactory } from '@COMMON/exception';
import { Crypto } from '@CRYPTO/domain';
import { Auth } from '@AUTH/domain';
import { IAuthRepository } from '@AUTH/infrastructure/port/auth.repository.port';
import { AuthExceptionMessage } from '@AUTH/provider/constant/exception-message';
import { AuthRepository } from '@AUTH/infrastructure/adapter/auth.repository';
import { IAuthService } from '../port/auth.service.port';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(AuthRepository)
    private readonly authRepository: IAuthRepository,
  ) {}

  async findOne(where: IAuthService.FindOne): Promise<Auth.State> {
    return throw_if_null(
      await this.authRepository.findOne(where),
      HttpExceptionFactory('NotFound'),
    );
  }

  checkPermission({ user, permission }: Auth.CheckPermission): void {
    if (!Auth.checkPermission({ user, permission }))
      throw HttpExceptionFactory('Forbidden');
    return;
  }

  async checkPassword({ password, hashed }: Auth.CheckPassword): Promise<void> {
    if (!(await Crypto.compare(password, hashed)))
      throw HttpExceptionFactory('BadRequest', AuthExceptionMessage.password);
    return;
  }

  async checkDuplicate({ email }: IAuthService.CheckDuplicate): Promise<void> {
    if (await this.authRepository.findOne({ email })) {
      throw HttpExceptionFactory(
        'BadRequest',
        AuthExceptionMessage.email_unique,
      );
    }
    return;
  }

  checkVerified({ verified }: IAuthService.CheckVerified): void {
    if (!verified) {
      throw HttpExceptionFactory(
        'BadRequest',
        AuthExceptionMessage.email_verified,
      );
    }
    return;
  }
}
