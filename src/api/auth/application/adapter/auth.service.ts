import { Inject, Injectable } from '@nestjs/common';
import { httpExceptionProvider } from 'src/api/common/provider/exception.provider';
import { ExceptionMessage } from 'src/api/common/provider/message.provider';
import { Auth } from '../../domain/auth.aggregate';
import { IAuth } from '../../domain/auth.interface';
import { AuthRepository } from '../../infrastructure/adapter/auth.repository';
import { IAuthRepository } from '../../infrastructure/port/auth.repository.interface';
import { ValidateAuthDTO, FindOneAuthDTO } from '../dto/auth.application.dto';
import { IAuthService } from '../port/auth.service.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(AuthRepository) private readonly authRepository: IAuthRepository,
  ) {}

  async findOne(dto: FindOneAuthDTO): Promise<IAuth> {
    const auth = await this.authRepository.findOne(dto);
    if (auth == null) {
      throw httpExceptionProvider('401', ExceptionMessage.NotFound);
    }
    return auth;
  }

  async validate({ username, password }: ValidateAuthDTO): Promise<IAuth> {
    const auth = await this.findOne({ username });
    const authentication = await Auth.authenticate(password, auth.password);
    if (!authentication) {
      throw httpExceptionProvider('401', '비밀번호가 일치하지 않습니다.');
    }
    return auth;
  }
}
