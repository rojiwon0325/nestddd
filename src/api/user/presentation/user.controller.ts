import { Controller, Get, Inject, Patch } from '@nestjs/common';
import { User } from '@USER/domain';
import { Profile } from '@USER/decorator';
import { IUserUsecase } from '@USER/application/port';
import { TypedBody } from '@nestia/core';

@Controller('users')
export class UserController {
  constructor(
    @Inject(IUserUsecase)
    private readonly userUsercase: IUserUsecase,
  ) {}
  /**
   * 내 프로필 보기 API
   * @tag users
   * @returns 계정 정보와 사용자 권한 정보 등을 전달
   * @throw 401 로그인이 필요합니다.
   */
  @Get('me')
  me(@Profile() profile: User.Profile): Promise<User.Public> {
    return this.userUsercase.me(profile);
  }

  /**
   * 내 권한 수정 API
   * @tag users
   * @param body 변경할 권한 정보를 포함
   * @returns 아무것도 반환하지 않습니다.
   * @throw 401 로그인이 필요합니다.
   */
  @Patch('me/role')
  setRole(
    @TypedBody() body: IUserUsecase.SetRoleBody,
    @Profile() { id }: User.Profile,
  ): Promise<void> {
    const { permission } = body;
    return this.userUsercase.setRole({ id }, { permission });
  }
}
