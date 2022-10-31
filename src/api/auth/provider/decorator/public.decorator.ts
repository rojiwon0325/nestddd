import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from '../constants';

export const Public = (isPublic = true) => SetMetadata(PUBLIC_KEY, isPublic);
