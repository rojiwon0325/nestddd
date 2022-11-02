import { IBaseAggregate } from '@COMMON/interface/base-aggregate.interface';
import { Implements } from 'src/util/class.interface';
import { UserRole } from './user.enum';

export namespace UserDomain {
  export type Id = number;
  export interface Property extends IBaseAggregate<Id> {
    readonly username: string;
    readonly role: UserRole;
  }
  export type Public = Pick<Property, 'id' | 'username' | 'role'>;
  export type PublicDetail = Pick<Property, 'id' | 'username' | 'role'>;

  export interface Method {
    getPublic: () => Public;
    getPublicDetail: () => PublicDetail;
    setUsername: (username: string) => void;
  }

  export type Aggregate = Property & Method;

  type Required = keyof Pick<Property, 'username'>;
  export type Props = Pick<Property, Required> &
    Partial<Omit<Property, Required>>;

  export interface StaticMethod {
    get: (props: Props) => Aggregate;
  }

  export type Static<C extends StaticMethod> = Implements<
    Aggregate,
    StaticMethod,
    C
  >;
}
