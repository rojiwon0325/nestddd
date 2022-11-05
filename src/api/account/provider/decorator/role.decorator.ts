import { Account } from '@ACCOUNT/domain';
import { SetMetadata } from '@nestjs/common';
import { ROLE_KEY } from '../constant/role.key';

export const Role = (role: Account.Permission) => SetMetadata(ROLE_KEY, role);
