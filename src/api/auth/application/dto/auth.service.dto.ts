import { AuthDomain } from '@AUTH/domain/auth.interface';
import { UserRole } from '@USER/domain/user.enum';

export namespace AuthServiceDTO {
  export type Validate = Pick<AuthDomain.Property, 'username' | 'password'>;
  export type FindOne =
    | Pick<AuthDomain.Property, 'id'>
    | Pick<AuthDomain.Property, 'username'>;

  export type CheckPermission = { user: UserRole; permission: UserRole };
}
