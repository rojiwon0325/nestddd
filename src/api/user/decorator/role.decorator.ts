import { SetMetadata } from '@nestjs/common';
import { User } from '../domain';
import { ROLE_KEY } from '../guard/constant';

export const Role = (role: User.Permission) => SetMetadata(ROLE_KEY, role);
