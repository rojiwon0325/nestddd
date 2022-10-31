export interface IBaseAggregate<IId> {
  readonly id: IId;
  readonly created_at: Date;
  readonly updated_at: Date;
}
