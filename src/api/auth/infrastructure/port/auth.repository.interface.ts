import { AuthDomain } from '@AUTH/domain/auth.interface';

export interface IAuthRepository {
  findOne: (
    where:
      | Pick<AuthDomain.Property, 'id'>
      | Pick<AuthDomain.Property, 'username'>,
  ) => Promise<AuthDomain.Aggregate | null>;
}
