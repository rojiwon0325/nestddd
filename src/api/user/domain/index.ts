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

  export type Public = ProfileEntity &
    Pick<AccountEntity, 'id' | 'username' | 'role'>;

  export type PublicDetail = ProfileEntity &
    Pick<AccountEntity, 'id' | 'username' | 'email' | 'role' | 'verified'>;
}

type Required = keyof Pick<User.Property, 'account' | 'profile'>;

export interface User {
  readonly get: (
    args: Pick<User.Property, Required> &
      Partial<Omit<User.Property, Required>>,
  ) => User.Property;
  readonly getPublic: (agg: User.Property) => User.Public;
  readonly getPublicDetail: (agg: User.Property) => User.PublicDetail;
  readonly setProfile: (
    agg: User.Property,
    update: Partial<User.ProfileEntity>,
  ) => User.Property;
  readonly setUsername: (
    agg: User.Property,
    update: Pick<User.AccountEntity, 'username'>,
  ) => User.Property;
  readonly setPassword: (
    agg: User.Property,
    update: Account.Password,
  ) => Promise<User.Property>;
}

export const User: User = {
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
