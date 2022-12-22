import { IResponse } from '@COMMON/interface/response.interface';
import { ExceptionMessage } from '@COMMON/exception/exception-message';
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
    const body =
      exception instanceof HttpException ? map_HTTP(exception) : IResponse_ISE;

    httpAdapter.reply(ctx.getResponse(), body, body.statusCode);
  }
}

const map_HTTP = (exception: HttpException): IResponse => ({
  statusCode: exception.getStatus(),
  message: getMessageInHttpException(exception),
});

const getMessageInHttpException = (exception: HttpException): string => {
  const message = exception.message;
  if (
    exception.name === 'BadRequestException' &&
    /(?=.*^Request )(?=.* is not following the promised type.$)/.test(message)
  ) {
    // tson error
    const response = exception.getResponse() as any;
    const target = (response.path as string).replace('$input.', '');
    const expected = response.expected as string;
    return `${target}이 ${expected}형식과 맞지 않습니다.`;
  }
  return message;
};

const IResponse_ISE: IResponse = {
  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  message: ExceptionMessage.ISE,
};
