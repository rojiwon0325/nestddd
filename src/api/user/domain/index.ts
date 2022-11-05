import { Account } from '@ACCOUNT/domain';
import { IBaseAggregate } from '@COMMON/interface/base-aggregate.interface';

export namespace User {
  export type Id = number;

  export type ProfileEntity = {
    /** 인물 소개 정보 */
    readonly bio?: string;
  };

  export type AccountEntity = Account.Property;

  export interface Property extends IBaseAggregate<Id> {
    /**
     * 인물 프로필 정보
     */
    readonly profile: ProfileEntity;

    /**
     * 사용자 계정 정보
     */
    readonly account: AccountEntity;
  }

  type Required = keyof Pick<Property, 'account' | 'profile'>;

  export type Public = ProfileEntity &
    Pick<AccountEntity, 'id' | 'username' | 'role'>;

  export type PublicDetail = ProfileEntity &
    Pick<AccountEntity, 'id' | 'username' | 'email' | 'role' | 'verified'>;

  export interface Method {
    readonly get: (
      args: Pick<Property, Required> & Partial<Omit<Property, Required>>,
    ) => Property;
    readonly getPublic: (agg: Property) => Public;
    readonly getPublicDetail: (agg: Property) => PublicDetail;
    readonly setProfile: (
      agg: Property,
      update: Partial<ProfileEntity>,
    ) => Property;
    readonly setUsername: (
      agg: Property,
      update: Pick<AccountEntity, 'username'>,
    ) => Property;
    readonly setPassword: (
      agg: Property,
      update: Account.Password,
    ) => Promise<Property>;
  }
}

export const User: User.Method = {
  get(args) {
    const now = new Date();
    const {
      id = 0,
      created_at = now,
      updated_at = now,
      account,
      profile,
    } = args;
    return {
      id,
      created_at,
      updated_at,
      account,
      profile,
    };
  },
  getPublic(agg) {
    const {
      profile: { bio },
      account: { id, username, role },
    } = agg;
    return { id, username, bio, role };
  },
  getPublicDetail(agg) {
    const {
      profile: { bio },
      account: { id, email, username, role, verified },
    } = agg;
    return { id, username, email, bio, role, verified };
  },
  setProfile(agg, update) {
    (agg as any).profile = { ...agg.profile, ...update };
    return agg;
  },
  setUsername(agg, { username }) {
    (agg as any).account = Account.setUsername(agg.account, { username });
    return agg;
  },

  async setPassword(agg, { password }) {
    (agg as any).account = await Account.setPassword(agg.account, { password });
    return agg;
  },
};
