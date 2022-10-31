import { IBaseAggregate } from '../interface/base-aggregate.interface';

export abstract class BaseAggregate<IId> implements IBaseAggregate<IId> {
  constructor(
    readonly id: IId,
    readonly created_at: Date,
    readonly updated_at: Date,
  ) {}
}
