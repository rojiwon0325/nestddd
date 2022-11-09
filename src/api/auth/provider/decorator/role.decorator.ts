import { Auth } from '@AUTH/domain';
import { SetMetadata } from '@nestjs/common';
import { ROLE_KEY } from '../constant/role.key';

export const Role = (role: Auth.Permission) => SetMetadata(ROLE_KEY, role);
