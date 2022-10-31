import { IAuth, IAuthProperty } from '../../domain/auth.interface';

export interface IAuthRepository {
  findOne: (
    where: Pick<IAuthProperty, 'id'> | Pick<IAuthProperty, 'username'>,
  ) => Promise<IAuth | null>;

  /** 존재하지 않는 대상인 경우, 아무 작업도 하지 않는다. */
  update: (auth: IAuth) => Promise<IAuth>;
}
