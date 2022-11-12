import { Auth } from '@AUTH/domain';
import { AuthPublic } from '@AUTH/provider/decorator/auth-public.decorator';
import { Public } from '@AUTH/provider/decorator/public.decorator';
import {
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserUsecase } from '@USER/application/adapter/user.usecase';
import { IUserUsecase } from '@USER/application/port/user.usecase.port';
import { UserResponseInterceptor } from '@USER/provider/user.interceptor';
import helper from 'nestia-helper';

@UseInterceptors(UserResponseInterceptor)
@Controller('users')
export class UserController {
  constructor(
    @Inject(UserUsecase)
    private readonly usecase: IUserUsecase,
  ) {}

  /**
   * 사용자 회원가입 API
   * @tag user
   * @tag public
   * @param body 사용자 계정 정보 전달
   * @returns 생성된 사용자의 세부 프로필 정보 응답
   * @throw 400 email duplicate
   */
  @Public()
  @Post()
  create(@helper.TypedBody() body: IUserUsecase.Create) {
    const { username, email, password } = body;
    return this.usecase.create({ username, email, password });
  }

  /**
   * 내 정보 보기 API
   * @tag user
   * @returns 사용자 상세 프로필 정보
   * @throw 404 사용자가 존재하지 않는 경우
   */
  @Get('me')
  findMe(@AuthPublic() { id }: Auth.Public) {
    return this.usecase.findMe({ id });
  }

  /**
   * 사용자 조회 API
   * @tag user
   * @tag public
   * @param id 사용자 id
   * @returns 사용자 공개 프로필 정보
   */
  @Public()
  @Get(':user_id')
  findOne(@helper.TypedParam('user_id', 'number') id: number) {
    return this.usecase.findOne({ id });
  }

  /**
   * 내 프로필 정보 수정 API
   * @tag user
   * @param body 변경할 정보만 포함
   * @returns 변경된 사용자 프로필 정보
   */
  @Patch('me')
  update(
    @AuthPublic() { id }: Auth.Public,
    @helper.TypedBody() body: IUserUsecase.Update,
  ) {
    const { username, bio, birth, phone } = body;
    return this.usecase.update({ id }, { username, bio, birth, phone });
  }

  /**
   * 내 계정 삭제 API
   * @tag user
   * @returns 삭제된 계정 id
   */
  @Delete('me')
  async remove(@AuthPublic() { id }: Auth.Public): Promise<{ id: number }> {
    await this.usecase.remove({ id });
    return { id };
  }
}
