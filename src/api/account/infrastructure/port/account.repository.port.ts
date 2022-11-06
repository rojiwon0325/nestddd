import { Account } from '@ACCOUNT/domain';
import { IBaseAggregate } from '@COMMON/interface/base-aggregate.interface';

export namespace IAccountRepository {
  export type FindOne =
    | Pick<Account.Property, 'id'>
    | Pick<Account.Property, 'email'>
    | Pick<Account.Property, 'username'>;

  export interface Entity extends IBaseAggregate<Account.Id> {
    /**
     * 이벤트 및 개인 확인용 이메일
     * @format email
     */
    email: string;
    /**
     * 이메일 인증 여부
     */
    verified: boolean;
    /**
     * 사용자명은 숫자와 문자로이루어진 6이상 15자리 이하의 문자열입니다.
     * @pattern ^\w{6,15}$
     */
    username: string;
    /**
     * 사용자 비밀번호
     */
    password: string;
    /**
     * 사용자 권한
     */
    role: Account.Permission;
  }
}

export interface IAccountRepository {
  readonly findOne: (
    where: IAccountRepository.FindOne,
  ) => Promise<Account.Property | null>;
  readonly save: (agg: Account.Property) => Promise<Account.Property>;
  readonly remove: (agg: Account.Property) => Promise<void>;
}
