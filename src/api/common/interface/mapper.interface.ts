export interface IEntityMapper<IAggregate, IRootEntity> {
  readonly toAggregate: (entity: IRootEntity) => IAggregate;
  readonly toRootEntity: (aggregate: IAggregate) => IRootEntity;
}
