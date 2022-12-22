import { Module } from '@nestjs/common';
import { UserController } from './presentation/user.controller';
import { JwtStrategy } from './guard/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { UserGuard } from './guard/user.guard';
import { RoleGuard } from './guard/role.guard';

@Module({
  imports: [PassportModule],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: UserGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
