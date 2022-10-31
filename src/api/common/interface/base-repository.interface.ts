import { BaseAggregate } from '../base/base-aggregate';

export interface IBaseRepository<IId, IAggregate extends BaseAggregate<IId>> {
  findOne: (
    where: Pick<BaseAggregate<IId>, 'id'>,
  ) => Promise<IAggregate | null>;
  findMany: () => Promise<IAggregate[]>;
  save: (aggregate: IAggregate) => Promise<IAggregate>;
  remove: (id: IId) => Promise<void>;
}
