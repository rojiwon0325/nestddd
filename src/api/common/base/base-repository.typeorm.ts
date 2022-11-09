import { FindOptionsWhere, Repository } from 'typeorm';
import { IEntityMapper } from '../interface/mapper.interface';
import { IBaseRepository } from '../interface/base-repository.interface';
import { TypeOrmBaseEntity } from './base-entity.typeorm';
import { IBaseAggregate } from '@COMMON/interface/base-aggregate.interface';
import { if_not_null } from '@COMMON/util/if-not-null';

export abstract class TypeOrmBaseRepository<
  Aggregate extends IBaseAggregate<number>,
  RootEntity extends TypeOrmBaseEntity,
> implements IBaseRepository<number, Aggregate>
{
  constructor(
    private readonly mapper: IEntityMapper<Aggregate, RootEntity>,
    private readonly repository: Repository<RootEntity>,
  ) {}

  async findOne({ id }: Pick<Aggregate, 'id'>): Promise<Aggregate | null> {
    const where: FindOptionsWhere<unknown> = { id };
    return if_not_null(
      await this.repository.findOne({ where }),
      this.mapper.toAggregate,
    );
  }

  async findMany(): Promise<Aggregate[]> {
    const list = await this.repository.find();
    return list.map(this.mapper.toAggregate);
  }

  async save(aggregate: Aggregate): Promise<Aggregate> {
    const entity = this.mapper.toRootEntity(aggregate);
    delete (entity as any).created_at;
    delete (entity as any).updated_at;
    return {
      ...aggregate,
      ...this.mapper.toAggregate(await this.repository.save(entity)),
    };
  }

  async remove({ id }: Pick<Aggregate, 'id'>): Promise<void> {
    await this.repository.delete(id);
    return;
  }

  protected getMapper(): IEntityMapper<Aggregate, RootEntity> {
    return this.mapper;
  }

  protected getRepository(): Repository<RootEntity> {
    return this.repository;
  }
}
