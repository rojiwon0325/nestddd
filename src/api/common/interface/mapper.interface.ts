export interface IEntityMapper<IAggregate, IRootEntity> {
  toAggregate: (entity: IRootEntity) => IAggregate;
  toRootEntity: (aggregate: IAggregate) => IRootEntity;
}
