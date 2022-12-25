import { IUserAggregate } from '@INTERFACE/user/domain';
import { SetMetadata } from '@nestjs/common';
import { ROLE_KEY } from '../guard/constant';

export const Role = (role: IUserAggregate.Permission) =>
  SetMetadata(ROLE_KEY, role);
