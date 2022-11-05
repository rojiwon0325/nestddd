import { IErrorResponse } from '@COMMON/interface/response.interface';
import { ExceptionMessage } from '@COMMON/provider/message.provider';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

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
    const message = exception.message;
    if (
      exception.name === 'BadRequestException' &&
      message === 'Request message is not following the promised type.'
    ) {
      // tson error
      const response = exception.getResponse() as any;
      const reason = response.reason as string | null;
      return `${
        reason ? reason.split(/(\$input.)(.*?)(, )/g)[2] + ' ' : ''
      }입력값이 잘못되었습니다.`;
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
