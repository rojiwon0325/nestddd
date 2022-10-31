import { FindOptionsWhere, Repository } from 'typeorm';
import { IEntityMapper } from '../interface/mapper.interface';
import { IBaseRepository } from '../interface/base-repository.interface';
import { BaseAggregate } from './base-aggregate';
import { TypeOrmBaseEntity } from './base-entity.typeorm';

export abstract class TypeOrmBaseRepository<
  IAggregate extends BaseAggregate<number>,
  IRootEntity extends TypeOrmBaseEntity,
> implements IBaseRepository<number, IAggregate>
{
  constructor(
    private readonly mapper: IEntityMapper<IAggregate, IRootEntity>,
    private readonly repository: Repository<IRootEntity>,
  ) {}

  async findOne({
    id,
  }: Pick<BaseAggregate<number>, 'id'>): Promise<IAggregate | null> {
    const where: FindOptionsWhere<unknown> = { id };
    const entity = await this.repository.findOne({ where });
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
    const { id } = await this.repository.save(entity);
    (aggregate as any).id = id;
    return aggregate;
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
    return;
  }

  protected getMapper(): IEntityMapper<IAggregate, IRootEntity> {
    return this.mapper;
  }

  protected getRepository(): Repository<IRootEntity> {
    return this.repository;
  }
}
