import { BaseAggregate } from '../base/base-aggregate';

export interface IBaseRepository<IId, IAggregate extends BaseAggregate<IId>> {
  findOne: (where: { id?: IId }) => Promise<IAggregate | null>;
  findMany: () => Promise<IAggregate[]>;
  save: (aggregate: IAggregate) => Promise<IAggregate>;
  remove: (aggregate: IAggregate) => Promise<void>;
}
