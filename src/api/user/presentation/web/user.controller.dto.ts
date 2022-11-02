import { AuthDomain } from '@AUTH/domain/auth.interface';
import { UserDomain } from '@USER/domain/user.interface';
import { UserErrorMessage } from '@USER/infrastructure/model/user.entity';
import { IsOptional, IsString, Matches } from 'class-validator';

type IValidateBody = Pick<AuthDomain.Property, 'username' | 'password'>;

export class ValidateUserBody implements IValidateBody {
  @IsString({ message: UserErrorMessage.username })
  username!: string;

  @Matches(/^[A-Za-z0-9]{6,12}$/, {
    message: UserErrorMessage.password_regex,
  })
  password!: string;
}

type IUpdateUserBody = Partial<Pick<UserDomain.Property, 'username'>>;

export class UpdateUserBody implements IUpdateUserBody {
  @IsOptional()
  @IsString({ message: UserErrorMessage.username })
  username?: string;
}
