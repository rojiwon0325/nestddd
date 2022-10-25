import { IRootEntity } from '../interface/entity.interface';
import { Entity } from './entity.base';

export abstract class BaseAggregate<IId>
  extends Entity<IId>
  implements IRootEntity<IId>
{
  constructor(
    readonly id: IId,
    readonly created_at: Date,
    readonly updated_at: Date,
  ) {
    super(id);
  }
}
