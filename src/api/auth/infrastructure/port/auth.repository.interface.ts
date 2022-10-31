import { IAuth, IAuthProperty } from '../../domain/auth.interface';

export interface IAuthRepository {
  findOne: (
    where: Pick<IAuthProperty, 'id'> | Pick<IAuthProperty, 'username'>,
  ) => Promise<IAuth | null>;
}
