import { Controller, Get, Patch, UseInterceptors } from '@nestjs/common';
import { User } from '@USER/domain';
import { Profile } from '@USER/decorator';
import { UserResponseInterceptor } from './user.interceptor';

@UseInterceptors(UserResponseInterceptor)
@Controller('users')
export class UserController {
  /**
   * 내 프로필 보기 API
   * @tag users
   * @returns 계정 정보와 사용자 권한 정보 등을 전달
   * @throw 401 로그인이 필요합니다.
   */
  @Get('me')
  async me(@Profile() profile: User.Profile): Promise<User.Public> {
    return { ...profile, permission: 'Normal' };
  }

  /**
   * 내 권한 수정 API
   * @tag users
   * @returns 아무것도 반환하지 않습니다.
   * @throw 401 로그인이 필요합니다.
   */
  @Patch('me/role')
  async setRole(@Profile() profile: User.Profile): Promise<void> {
    // 사용자 정보 수정 usecase
    return;
  }
}
