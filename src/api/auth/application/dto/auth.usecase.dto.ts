import { AuthDomain } from '@AUTH/domain/auth.interface';
import { CookieOptions } from 'express';

export namespace AuthUsecaseDTO {
  export type SignIn = Pick<AuthDomain.Property, 'id'>;
  export type SignInResponse = [string, string, CookieOptions];
}
