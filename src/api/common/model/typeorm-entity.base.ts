import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { IRootEntity } from '../interface/entity.interface';

@Entity()
export abstract class TypeOrmBaseEntity implements IRootEntity<number> {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @CreateDateColumn()
  @IsDate()
  @Type(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @IsDate()
  @Type(() => Date)
  updated_at: Date;
}
