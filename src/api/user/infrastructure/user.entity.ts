import { IUserAggregate } from '@INTERFACE/user/domain';
import {
  Entity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  Column,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryColumn()
  id!: number;

  @Column({ default: 'Normal' })
  role!: IUserAggregate.Permission;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date | null;
}
