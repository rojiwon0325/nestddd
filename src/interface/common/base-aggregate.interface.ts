export interface IBaseAggregate<IId> {
  /**
   * 애그리거트의 id
   */
  readonly id: IId;
  /**
   * 애그리거트 생성일
   */
  readonly created_at: Date;
  /**
   * 애그리거트 수정일
   */
  readonly updated_at: Date;
}
