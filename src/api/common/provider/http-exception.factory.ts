import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ExceptionMessage } from './exception-message';

export type Status =
  | 'BadRequest'
  | 'UnAuthorized'
  | 'Forbidden'
  | 'NotFound'
  | 'ISE';

export const HttpExceptionFactory = (
  status: Status,
  message?: string,
): HttpException => {
  switch (status) {
    case 'BadRequest':
      return new BadRequestException(message ?? ExceptionMessage.BR);
    case 'UnAuthorized':
      return new UnauthorizedException(message ?? ExceptionMessage.UAE);
    case 'Forbidden':
      return new ForbiddenException(message ?? ExceptionMessage.FBD);
    case 'NotFound':
      return new NotFoundException(message ?? ExceptionMessage.NF);
    case 'ISE':
    default:
      return new InternalServerErrorException(message ?? ExceptionMessage.ISE);
  }
};
