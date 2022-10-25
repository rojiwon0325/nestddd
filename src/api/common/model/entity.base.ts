import { IEntity } from '../interface/entity.interface';

export abstract class Entity<IId> implements IEntity<IId> {
  constructor(readonly id: IId) {}
}
