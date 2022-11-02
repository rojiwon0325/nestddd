import { IBaseAggregate } from '@COMMON/interface/base-aggregate.interface';
import { UserRole } from '@USER/domain/user.enum';
import { Implements } from 'src/util/class.interface';

export namespace AuthDomain {
  export type Id = number;

  export interface Property extends IBaseAggregate<Id> {
    readonly username: string;
    readonly password: string;
    readonly role: UserRole;
  }

  export type Public = Pick<Property, 'id' | 'username' | 'role'>;

  export interface Method {
    getPublic: () => Public;
  }

  export type Aggregate = Property & Method;

  type Required = keyof Pick<Property, 'username' | 'password' | 'role'>;

  export type Props = Pick<Property, Required> &
    Partial<Omit<Property, Required>>;

  export type AuthenticateArgs = { password: string; hashed: string };
  export type CheckPermissionArgs = { user: UserRole; permission: UserRole };

  export interface StaticMethod {
    get: (props: Props) => Aggregate;
    authenticate: (args: AuthenticateArgs) => Promise<boolean>;
    checkPermission: (args: CheckPermissionArgs) => boolean;
  }

  export type Static<C extends StaticMethod> = Implements<
    Aggregate,
    StaticMethod,
    C
  >;
}
