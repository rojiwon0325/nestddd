import { IBaseAggregate } from './base-aggregate.interface';

export interface IBaseRepository<IId, IAggregate extends IBaseAggregate<IId>> {
  readonly findOne: (
    where: Pick<IBaseAggregate<IId>, 'id'>,
  ) => Promise<IAggregate | null>;
  readonly findMany: () => Promise<IAggregate[]>;
  /**
   * typeorm repository save는 다음과 같이 작동한다.
   * 존재하지 않는 id에 대해서 새로운 데이터를 생성하고 전체 데이터를 반환한다.
   * 존재하는 id에 대해서 입력으로 주어진 데이터만 반환한다.
   */
  readonly save: (aggregate: IAggregate) => Promise<IAggregate>;
  readonly remove: (where: Pick<IBaseAggregate<IId>, 'id'>) => Promise<void>;
}
