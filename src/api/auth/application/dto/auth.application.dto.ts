import { CookieOptions } from 'express';
import { IAuthProperty } from '../../domain/auth.interface';

export type ValidateAuthDTO = Pick<IAuthProperty, 'username' | 'password'>;

export type FindOneAuthDTO =
  | Pick<IAuthProperty, 'id'>
  | Pick<IAuthProperty, 'username'>;

export type ISignInResponse = [string, string, CookieOptions];
