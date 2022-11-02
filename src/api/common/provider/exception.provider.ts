import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

export type StatusCode = '400' | '401' | '403' | '404' | '500';

export const throwHttpException = (
  statusCode: StatusCode,
  message?: string,
) => {
  switch (statusCode) {
    case '400':
      throw new BadRequestException(message);
    case '401':
      throw new UnauthorizedException(message);
    case '403':
      throw new ForbiddenException(message);
    case '404':
      throw new NotFoundException(message);
    case '500':
    default:
      throw new InternalServerErrorException(message);
  }
};
