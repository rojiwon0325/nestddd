import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { BaseAggregate } from 'src/api/common/model/aggregate.base';
import { IUserId, IUserProperty } from '../domain/user.interface';
import { UserErrorMessage } from '../infrastructure/user.entity';

export class FindOneUserParam {
  @IsNumber()
  @Type(() => Number)
  user_id: number;
}

export class CreateUserBody
  implements Omit<IUserProperty, keyof BaseAggregate<IUserId>>
{
  @IsString({ message: UserErrorMessage.username })
  username: string;
}

export type RemoveUserResponse = {
  id: IUserId;
};
