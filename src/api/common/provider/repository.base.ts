import { FindOneOptions, Repository } from 'typeorm';
import { IEntityMapper } from '../interface/mapper.interface';
import { IBaseRepository } from '../interface/repository.interface';
import { BaseAggregate } from '../model/aggregate.base';
import { TypeOrmBaseEntity } from '../model/typeorm-entity.base';

export abstract class TypeOrmBaseRepository<
  IId,
  IAggregate extends BaseAggregate<IId>,
  IRootEntity extends TypeOrmBaseEntity,
> implements IBaseRepository<IId, IAggregate>
{
  constructor(
    private readonly mapper: IEntityMapper<IAggregate, IRootEntity>,
    private readonly repository: Repository<IRootEntity>,
  ) {}

  async findOne(id: IId): Promise<IAggregate | null> {
    const findOption: FindOneOptions = { where: { id } };
    const entity = await this.repository.findOne(findOption);
    return entity == null ? null : this.mapper.toAggregate(entity);
  }

  async findMany(): Promise<IAggregate[]> {
    const list = await this.repository.find();
    return list.map(this.mapper.toAggregate);
  }

  async save(aggregate: IAggregate): Promise<IAggregate> {
    const entity = this.mapper.toRootEntity(aggregate);
    delete (entity as any).created_at;
    delete (entity as any).updated_at;
    const newEntity = await this.repository.save(entity);
    return this.mapper.toAggregate(newEntity);
  }

  async remove(aggregate: IAggregate): Promise<void> {
    const entity = this.mapper.toRootEntity(aggregate);
    await this.repository.remove(entity);
    return;
  }

  protected getMapper(): IEntityMapper<IAggregate, IRootEntity> {
    return this.mapper;
  }

  protected getRepository(): Repository<IRootEntity> {
    return this.repository;
  }
}
