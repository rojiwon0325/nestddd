import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

export type StatusCode = '400' | '401' | '403' | '404' | '500';

export const httpExceptionProvider = (
  statusCode: StatusCode,
  message?: string,
) => {
  switch (statusCode) {
    case '400':
      return new BadRequestException(message);
    case '401':
      return new UnauthorizedException(message);
    case '403':
      return new ForbiddenException(message);
    case '404':
      return new NotFoundException(message);
    case '500':
    default:
      return new InternalServerErrorException(message);
  }
};
