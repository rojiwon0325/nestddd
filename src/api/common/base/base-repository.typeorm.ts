import { FindOptionsWhere, Repository } from 'typeorm';
import { TypeOrmBaseEntity } from './base-entity.typeorm';
import { map } from '../util';
import { IEntityMapper } from '../interface';
import { IBaseRepository } from '../interface';
import { IBaseAggregate } from '../interface';

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
    return map(
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
    await this.repository.softDelete(id);
    return;
  }

  protected getMapper(): IEntityMapper<Aggregate, RootEntity> {
    return this.mapper;
  }

  protected getRepository(): Repository<RootEntity> {
    return this.repository;
  }
}
