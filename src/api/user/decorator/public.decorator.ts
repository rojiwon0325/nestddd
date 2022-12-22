import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from '../guard/constant';

export const Public = (isPublic = true) => SetMetadata(PUBLIC_KEY, isPublic);
