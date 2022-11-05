import { AccountEntity } from '@ACCOUNT/infrastructure/adapter/account.entity';
import { TypeOrmBaseEntity } from '@COMMON/base/base-entity.typeorm';
import { Column, Entity, JoinColumn, OneToOne, RelationId } from 'typeorm';
import { IUserRepository } from '../port/user.repository.port';

@Entity({ name: 'users' })
export class UserEntity
  extends TypeOrmBaseEntity
  implements IUserRepository.Entity
{
  @Column({ default: '' })
  bio!: string;

  @RelationId((user: UserEntity) => user.account)
  account_id!: number;

  @OneToOne(() => AccountEntity, { onDelete: 'CASCADE', cascade: ['update'] })
  @JoinColumn()
  account!: AccountEntity;
}
