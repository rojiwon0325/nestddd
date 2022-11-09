import { IBaseAggregate } from '@COMMON/interface/base-aggregate.interface';

export namespace User {
  export type Id = number;
  export type Permission = 'Admin' | 'Manager' | 'Normal';

  export type MetadataVO = {
    readonly bio?: string;
    readonly phone?: string;
    readonly birth?: string;
  };
  export interface State extends IBaseAggregate<Id> {
    /**
     * @format email
     */
    readonly email: string;
    /**
     * 이메일 인증 여부
     */
    readonly verified: boolean;
    /**
     * 비밀번호는 숫자와 문자로이루어진 6이상 20자리 이하의 문자열입니다.
     * @pattern ^\w{6,20}$
     */
    readonly password: string;
    /**
     * 사용자명은 숫자와 문자로이루어진 6이상 15자리 이하의 문자열입니다.
     * @pattern ^\w{6,15}$
     */
    readonly username: string;

    readonly role: Permission;
    /**
     * 사용자 프로필 추가정보
     */
    readonly metadata: MetadataVO;
  }

  export type Profile = MetadataVO & Pick<State, 'id' | 'username' | 'role'>;

  export type ProfileDetail = Profile & Pick<State, 'email' | 'verified'>;
}

type Required = keyof Pick<User.State, 'password' | 'email' | 'username'>;

/**
 * 기본적인 상태 변경 및 데이터 필터링
 */
export interface User {
  readonly get: (
    props: Pick<User.State, Required> & Partial<Omit<User.State, Required>>,
  ) => User.State;
  readonly getProfile: (agg: User.State) => User.Profile;
  readonly getProfileDetail: (agg: User.State) => User.ProfileDetail;
  readonly setUsername: (
    agg: Pick<User.State, 'username'>,
    update: Pick<User.State, 'username'>,
  ) => void;
  readonly setMetadata: (
    agg: Pick<User.State, 'metadata'>,
    update: User.MetadataVO,
  ) => void;
}

export const User: User = {
  get(props) {
    const now = new Date();
    const {
      id = 0,
      created_at = now,
      updated_at = now,
      username,
      email,
      password,
      verified = false,
      metadata = {},
      role = 'Normal',
    } = props;
    return {
      id,
      created_at,
      updated_at,
      username,
      email,
      password,
      verified,
      metadata: {
        bio: metadata.bio,
        birth: metadata.birth,
        phone: metadata.phone,
      },
      role,
    };
  },
  getProfile(agg) {
    const {
      id,
      username,
      role,
      metadata: { bio, birth, phone },
    } = agg;
    return { id, username, role, bio, birth, phone };
  },
  getProfileDetail(agg) {
    const {
      id,
      username,
      role,
      metadata: { bio, birth, phone },
      email,
      verified,
    } = agg;
    return { id, username, role, bio, birth, phone, email, verified };
  },
  setUsername(agg, { username }) {
    (agg as any).username = username;
    return;
  },
  setMetadata(agg, { bio, birth, phone }) {
    const metadata = agg.metadata;
    if (bio) (metadata as any).bio = bio;
    if (birth) (metadata as any).birth = birth;
    if (phone) (metadata as any).phone = phone;
    return;
  },
};
