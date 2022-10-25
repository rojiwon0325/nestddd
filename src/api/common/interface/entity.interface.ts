export interface IEntity<IId> {
  id: IId;
}

export interface IRootEntity<IId> extends IEntity<IId> {
  created_at: Date;
  updated_at: Date;
}
