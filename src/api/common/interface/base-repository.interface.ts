import { IBaseAggregate } from './base-aggregate.interface';

export interface IBaseRepository<IId, IAggregate extends IBaseAggregate<IId>> {
  readonly findOne: (
    where: Pick<IBaseAggregate<IId>, 'id'>,
  ) => Promise<IAggregate | null>;
  readonly findMany: () => Promise<IAggregate[]>;
  readonly save: (aggregate: IAggregate) => Promise<IAggregate>;
  readonly remove: (where: Pick<IBaseAggregate<IId>, 'id'>) => Promise<void>;
}
