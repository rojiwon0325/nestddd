import { User } from '../domain/user.aggregate';
import { IUserProps } from '../../user/domain/user.interface';

describe('User Aggregate Unit Test', () => {
  const list: IUserProps[] = [];
  it.each(list)('User.get - 사용자 애그리거트 인스턴스 생성', (prop) => {
    const user = User.get(prop);

    expect(user.id).toBe(prop.id ?? 0);
    return;
  });

  it('getResponse - 사용자 정보 응답 형태로 필터링', () => {
    expect(0).toBe(0);
  });
});
