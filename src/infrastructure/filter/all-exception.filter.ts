import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { IErrorResponse } from 'src/api/common/interface/response.interface';
import { ExceptionMessage } from 'src/api/common/provider/message.provider';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    let statusCode: number;
    let responseBody: IErrorResponse;
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      responseBody = {
        statusCode,
        message: this.extractMessageInHttpException(exception),
      };
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      responseBody = {
        statusCode,
        message: this.extractMessageInUnKnwon(exception),
      };
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
  extractMessageInHttpException(exception: HttpException): string {
    const exceptionResponse = exception.getResponse();
    if (typeof exceptionResponse == 'object') {
      const message = (exceptionResponse as any)?.message;
      if (typeof message == 'string') {
        return message;
      } else if (message.constructor === Array && message.length > 0) {
        return message[0];
      }
    }
    return exception.message;
  }
  extractMessageInUnKnwon(exception: unknown): string {
    try {
      if (!!exception && typeof exception === 'object') {
        const message = (exception as any)?.message;
        if (typeof message == 'string') {
          return message;
        }
      }
    } catch {}
    return ExceptionMessage.ISE;
  }
}
