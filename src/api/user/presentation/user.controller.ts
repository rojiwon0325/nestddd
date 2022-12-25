import { Controller, Delete, Get, Inject, Patch } from '@nestjs/common';
import { Profile } from '@USER/decorator';
import { TypedBody } from '@nestia/core';
import { IUserUsecase } from '@INTERFACE/user/application';
import { IUserAggregate } from '@INTERFACE/user/domain';
import { IUserController } from '@INTERFACE/user/presentation';

@Controller('users')
export class UserController {
  constructor(
    @Inject(IUserUsecase)
    private readonly userUsecase: IUserUsecase,
  ) {}
  /**
   * 내 프로필 보기 API
   * @tag users
   * @returns 계정 정보와 사용자 권한 정보 등을 전달
   * @throw 401 로그인이 필요합니다.
   */
  @Get('me')
  me(
    @Profile() profile: IUserAggregate.Profile,
  ): Promise<IUserAggregate.Public> {
    return this.userUsecase.me(profile);
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
    @TypedBody() body: IUserController.SetRoleBody,
    @Profile() profile: IUserAggregate.Profile,
  ): Promise<void> {
    const { role } = body;
    return this.userUsecase.setRole(profile, { role });
  }

  /**
   * user delete API
   * @tag users
   * @returns
   */
  @Delete('me')
  remove(@Profile() profile: IUserAggregate.Profile): Promise<void> {
    return this.userUsecase.remove(profile);
  }
}
