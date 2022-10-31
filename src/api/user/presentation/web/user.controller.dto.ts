import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Matches } from 'class-validator';
import { IAuthProperty } from 'src/api/auth/domain/auth.interface';
import { IUserProperty } from '../../domain/user.interface';
import { UserErrorMessage } from '../../infrastructure/model/user.entity';

export class FindOneUserParam {
  @IsNumber()
  @Type(() => Number)
  user_id: number;
}

type ICreateUserBody = Pick<IAuthProperty, 'username' | 'password'>;

export class CreateUserBody implements ICreateUserBody {
  @IsString({ message: UserErrorMessage.username })
  username: string;

  @Matches(/^[A-Za-z0-9]{6,12}$/, {
    message: UserErrorMessage.password_regex,
  })
  password: string;
}

type IUpdateUserBody = Partial<Pick<IUserProperty, 'username'>>;

export class UpdateUserBody implements IUpdateUserBody {
  @IsOptional()
  @IsString({ message: UserErrorMessage.username })
  username?: string;
}

type IRemoveUserBody = Pick<IAuthProperty, 'username' | 'password'>;

export class RemoveUserBody implements IRemoveUserBody {
  @IsString({ message: UserErrorMessage.username })
  username: string;
  @IsString({ message: UserErrorMessage.password })
  password: string;
}
