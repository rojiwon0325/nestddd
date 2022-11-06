import { IBaseAggregate } from '@COMMON/interface/base-aggregate.interface';
import { Crypto } from '@CRYPTO/domain';

export namespace Account {
  export type Id = number;
  export type Permission = 'Admin' | 'Manager' | 'Normal';
  export interface Property extends IBaseAggregate<Id> {
    /**
     * 이벤트 및 개인 확인용 이메일
     * @format email
     */
    readonly email: string;
    /**
     * 이메일 인증 여부
     */
    readonly verified: boolean;
    /**
     * 사용자명은 숫자와 문자로이루어진 6이상 15자리 이하의 문자열입니다.
     * @pattern ^\w{6,15}$
     */
    readonly username: string;

    readonly password: string;
    /**
     * 사용자 권한
     */
    readonly role: Permission;
  }

  export interface Password {
    /**
     * 비밀번호는 숫자와 문자로이루어진 6이상 20자리 이하의 문자열입니다.
     * @pattern ^\w{6,20}$
     */
    readonly password: string;
  }

  type Required = keyof Pick<Property, 'email' | 'username' | 'password'>;

  export type Public = Pick<Property, 'id' | 'email' | 'username' | 'role'>;

  export interface Method {
    readonly checkPermission: (args: {
      readonly user: Permission;
      readonly permission: Permission;
    }) => boolean;
  }

  export interface Method {
    readonly get: (
      args: Pick<Property, Required> & Partial<Omit<Property, Required>>,
    ) => Property;
    readonly getPublic: (agg: Property) => Public;
    readonly setUsername: (
      agg: Property,
      update: Pick<Property, 'username'>,
    ) => Property;
    readonly setPassword: (
      agg: Property,
      update: Password,
    ) => Promise<Property>;
  }
}

const permissionLevel: { [key in Account.Permission]: number } = {
  Admin: 0,
  Manager: 1,
  Normal: 2,
};

export const Account: Account.Method = {
  get(agg) {
    const now = new Date();
    const {
      id = 0,
      created_at = now,
      updated_at = now,
      email,
      verified = false,
      username,
      password,
      role = 'Normal',
    } = agg;
    return {
      id,
      created_at,
      updated_at,
      username,
      email,
      verified,
      password,
      role,
    };
  },
  getPublic(agg) {
    const { id, username, email, role } = agg;
    return { id, username, email, role };
  },

  checkPermission({ user, permission }) {
    const ulevel = permissionLevel[user];
    const plevel = permissionLevel[permission];
    return ulevel <= plevel;
  },
  setUsername(agg, { username }) {
    return { ...agg, username };
  },
  async setPassword(agg, { password }) {
    return { ...agg, password: await Crypto.encrypt(password) };
  },
};
