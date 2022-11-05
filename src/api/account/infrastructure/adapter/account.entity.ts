import { Column, Entity } from 'typeorm';
import { TypeOrmBaseEntity } from '@COMMON/base/base-entity.typeorm';
import { IAccountRepository } from '../port/account.repository.port';
import { Account } from '@ACCOUNT/domain';

export const AccountErrorMessage = {
  username_unique: '이미 사용중인 사용자명입니다.',
  email_unique: '이미 사용중인 이메일입니다.',
  password_regex: '비밀번호는 숫자와 문자로 이루어진 6~12자리 문자열입니다.',
};

@Entity({ name: 'accounts' })
export class AccountEntity
  extends TypeOrmBaseEntity
  implements IAccountRepository.Entity
{
  @Column({ unique: true })
  email!: string;

  @Column({ default: false })
  verified!: boolean;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column({ default: 'Normal' })
  role!: Account.Permission;
}
