import { User } from '@USER/domain';
import { IUserRepository } from '@USER/infrastructure/port';

export namespace IUserService {
  export type UpdateData = IUserRepository.UpdateData;
}

export interface IUserService {
  /**
   * profile에 대응하는 데이터를 반환
   * soft-delete된 상태면 복구
   * 존재하지 않으면 생성
   * @param profile 사용자 프로필 정보
   * @returns 애그리거트 상태 정보
   */
  readonly findOne: (profile: User.Profile) => Promise<User.State>;
  /**
   * 인자로 전달받은 애그리거트 상태 정보를 영속화한다.
   * @param state 수정된 애그리거트 상태 정보
   * @returns 수정한 애그리거트 상태 정보
   */
  readonly save: (state: User.State) => Promise<User.State>;
  /**
   * filter에 해당하는 애그리거트 앤티티(들)에 data 정보 적용
   * @param filter 특정 앤티티를 찾기 위한 기준
   * @param data 수정한 정보
   */
  readonly update: (
    filter: Pick<User.State, 'id'>,
    data: IUserService.UpdateData,
  ) => Promise<void>;

  /**
   * user soft-delete method
   * @param filter
   * @returns
   */
  readonly remove: (filter: Pick<User.State, 'id'>) => Promise<void>;
}

export const IUserService = Symbol('UserService');
