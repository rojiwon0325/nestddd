import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/api/user/domain/user.enum';
import { ROLE_KEY } from '../constants';

export const Role = (role: UserRole) => SetMetadata(ROLE_KEY, role);
