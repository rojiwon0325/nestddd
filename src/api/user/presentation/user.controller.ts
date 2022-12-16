import { Controller, Get } from '@nestjs/common';
import { User } from '@USER/domain';
import { Profile } from '@USER/decorator';

@Controller('users')
export class UserController {
  @Get('me')
  me(@Profile() profile: User.Profile) {
    return profile;
  }
}
