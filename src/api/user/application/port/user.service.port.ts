import { User } from '@USER/domain';

export namespace IUserService {
  export type UpdateData = Partial<
    Pick<User.State, 'email' | 'username' | 'role'>
  >;
}

export interface IUserService {
  /**
   * filter에 해당하는 앤티티를 찾고 없으면 생성한다.
   * @param filter 특정 앤티티를 찾기 위한 기준
   * @returns 애그리거트 상태 정보
   */
  readonly findOne: (filter: Pick<User.State, 'id'>) => Promise<User.State>;
  /**
   * 인자로 전달받은 애그리거트 상태 정보를 영속화한다.
   * @param agg 수정된 애그리거트 상태 정보
   * @returns 수정한 애그리거트 상태 정보
   */
  readonly save: (agg: User.State) => Promise<User.State>;
  /**
   * filter에 해당하는 애그리거트 앤티티(들)에 data 정보 적용
   * @param filter 특정 앤티티를 찾기 위한 기준
   * @param data 수정한 정보
   */
  readonly update: (
    filter: Pick<User.State, 'id'>,
    data: IUserService.UpdateData,
  ) => Promise<void>;
}

export const IUserService = Symbol('UserService');
