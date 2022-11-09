import { User } from '@USER/domain';
import { TypeOrmBaseEntity } from '@COMMON/base/base-entity.typeorm';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends TypeOrmBaseEntity {
  @Column({ unique: true })
  email!: string;

  @Column({ default: false })
  verified!: boolean;

  @Column()
  password!: string;

  @Column()
  username!: string;

  @Column({ default: 'Normal' })
  role!: User.Permission;

  @Column({ default: null, nullable: true })
  bio?: string;

  @Column({ default: null, nullable: true })
  phone?: string;

  @Column({ default: null, nullable: true })
  birth?: string;
}
