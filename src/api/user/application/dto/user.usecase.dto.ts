import { AuthDomain } from '@AUTH/domain/auth.interface';
import { UserDomain } from '@USER/domain/user.interface';

export namespace UserUsecaseDTO {
  export type Create = Pick<AuthDomain.Property, 'username' | 'password'>;
  export type FindOne =
    | Pick<UserDomain.Public, 'id'>
    | Pick<UserDomain.Public, 'username'>;
  export type Update = Partial<Pick<UserDomain.Public, 'username'>>;
  export type RemoveResponse = Pick<UserDomain.Public, 'id'>;
}
