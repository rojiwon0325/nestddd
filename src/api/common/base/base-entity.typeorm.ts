import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { IBaseAggregate } from '../interface/base-aggregate.interface';

@Entity()
export abstract class TypeOrmBaseEntity implements IBaseAggregate<number> {
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
