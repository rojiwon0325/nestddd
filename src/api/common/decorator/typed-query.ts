import { throw_if_null } from '@COMMON/util';
import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import type express from 'express';

type QueryType = 'boolean' | 'number' | 'string' | 'string' | 'uuid';
interface TypedQueryOptions {
  type?: QueryType;
  multiple?: boolean;
  nullable?: boolean;
}
const UUID_PATTERN =
  /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;

export const type_cast = (val: string, type: QueryType) => {
  if (type === 'boolean') {
    if (val === 'true' || val === 'True' || val === '1') {
      return true;
    }
    if (val === 'false' || val === 'False' || val === '0') {
      return false;
    }
  }
  if (type === 'number') {
    const num = Number(val);
    if (!isNaN(num)) return num;
  }
  if (type === 'uuid' && UUID_PATTERN.test(val)) {
    return val;
  }
  if (type === 'string') {
    return val;
  }
  return null;
};

export const query_typecast = (
  key: string,
  value: string | object | string[] | undefined,
  options: TypedQueryOptions = {
    type: 'string',
    multiple: false,
    nullable: false,
  },
) => {
  const { type = 'string', multiple = false, nullable = false } = options;
  const typecast_exception = new BadRequestException(
    `Value of the URL query '${key}' is not a ${type}.`,
  );
  if (value == undefined) {
    if (nullable) {
      return null;
    } else {
      throw new BadRequestException(
        `Value of the URL query '${key}' is required.`,
      );
    }
  }
  if (typeof value === 'string') {
    return multiple
      ? [throw_if_null(type_cast(value, type), typecast_exception)]
      : throw_if_null(type_cast(value, type), typecast_exception);
  }
  if (Array.isArray(value)) {
    if (!multiple) {
      throw new BadRequestException(
        `Value of the URL query '${key}' is not a single.`,
      );
    }
    if (typeof value[0] !== 'string') {
      throw typecast_exception;
    }
    return value.map((item) =>
      throw_if_null(type_cast(item, type), typecast_exception),
    );
  }
  throw typecast_exception;
};

/**
 * URL parameter decorator with type.
 *
 * `TypedQuery` is a decorator function getting specific typed query from the HTTP
 * request URL. It's almost same with the {@link nest.Query}, but `TypedQuery` can specify
 * the query type manually.
 *
 * @param name URL Query name
 * @param type Type of the URL query
 * @param options query type option
 * @returns Parameter decorator
 *
 * @author jiwon ro - https://github.com/rojiwon0325
 */
export const TypedQuery = (
  key: string,
  options: TypedQueryOptions = {
    type: 'string',
    multiple: false,
    nullable: false,
  },
) =>
  createParamDecorator(({}: any, ctx: ExecutionContext) => {
    const request: express.Request = ctx.switchToHttp().getRequest();
    const value = request.query[key];
    return query_typecast(key, value, options);
  })(key);
