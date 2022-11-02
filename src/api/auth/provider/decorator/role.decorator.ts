import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@USER/domain/user.enum';
import { ROLE_KEY } from '../constant/role.key';

export const Role = (role: UserRole) => SetMetadata(ROLE_KEY, role);
