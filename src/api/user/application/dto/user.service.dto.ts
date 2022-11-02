import { UserDomain } from '@USER/domain/user.interface';

export namespace UserServiceDTO {
  export type FindOne =
    | Pick<UserDomain.Property, 'id'>
    | Pick<UserDomain.Property, 'username'>;
}
