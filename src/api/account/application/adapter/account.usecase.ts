import { Account } from '@ACCOUNT/domain';
import { AccountRepository } from '@ACCOUNT/infrastructure/adapter/account.repository';
import { IAccountRepository } from '@ACCOUNT/infrastructure/port/account.repository.port';
import { Cookie } from '@ACCOUNT/provider/constant/cookie';
import { throwHttpException } from '@COMMON/provider/exception.provider';
import { ExceptionMessage } from '@COMMON/provider/message.provider';
import { Crypto } from '@CRYPTO/domain';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAccountService } from '../port/account.service.port';
import { IAccountUsecase } from '../port/account.usecase.port';
import { AccountService } from './account.service';

@Injectable()
export class AccountUsecase implements IAccountUsecase {
  constructor(
    @Inject(AccountRepository)
    private readonly accountRepository: IAccountRepository,
    @Inject(AccountService)
    private readonly accountService: IAccountService,
    private readonly jwtSerivce: JwtService,
  ) {}

  async signIn(
    dto: IAccountUsecase.SignIn,
  ): Promise<IAccountUsecase.SignInResponse> {
    const { id } = await this.accountService.signInLocal(dto);
    const token = this.jwtSerivce.sign({ id });
    return [Cookie.name, token, Cookie.option];
  }

  async signUp({
    email,
    username,
    password,
  }: IAccountUsecase.SignUp): Promise<Account.Public> {
    await Promise.all([
      this.accountService.checkDuplicate({ username }),
      this.accountService.checkDuplicate({ email }),
    ]);
    const hashed = await Crypto.encrypt(password);
    return Account.getPublic(
      await this.accountRepository.save(
        Account.get({ email, username, password: hashed }),
      ),
    );
  }

  async remove(
    where: Account.Public,
    validate: IAccountUsecase.SignIn,
  ): Promise<IAccountUsecase.RemoveResponse> {
    if ('username' in validate && validate.username != where.username) {
      throwHttpException('403', ExceptionMessage.FBD);
    } else if ('email' in validate && validate.email != where.email) {
      throwHttpException('403', ExceptionMessage.FBD);
    }
    const account = await this.accountService.signInLocal(validate);
    await this.accountRepository.remove(account);
    return where;
  }
}
