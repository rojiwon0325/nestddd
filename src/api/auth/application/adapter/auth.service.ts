import { Auth } from '@AUTH/domain/auth.aggregate';
import { AuthDomain } from '@AUTH/domain/auth.interface';
import { AuthRepository } from '@AUTH/infrastructure/adapter/auth.repository';
import { IAuthRepository } from '@AUTH/infrastructure/port/auth.repository.interface';
import { throwHttpException } from '@COMMON/provider/exception.provider';
import { ExceptionMessage } from '@COMMON/provider/message.provider';
import { Inject, Injectable } from '@nestjs/common';
import { AuthServiceDTO } from '../dto/auth.service.dto';
import { IAuthService } from '../port/auth.service.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(AuthRepository)
    private readonly authRepository: IAuthRepository,
  ) {}

  async findOne(dto: AuthServiceDTO.FindOne): Promise<AuthDomain.Aggregate> {
    const auth = await this.authRepository.findOne(dto);
    return auth == null
      ? throwHttpException('404', ExceptionMessage.NotFound)
      : auth;
  }

  checkPermission({
    user,
    permission,
  }: AuthServiceDTO.CheckPermission): boolean {
    return Auth.checkPermission({ user, permission });
  }

  async validate({
    username,
    password,
  }: AuthServiceDTO.Validate): Promise<AuthDomain.Aggregate> {
    const auth = await this.findOne({ username });
    const authentication = await Auth.authenticate({
      password,
      hashed: auth.password,
    });
    return !authentication
      ? throwHttpException('401', '비밀번호가 일치하지 않습니다.')
      : auth;
  }
}
