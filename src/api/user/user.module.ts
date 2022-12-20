import { Module } from '@nestjs/common';
import { UserController } from './presentation/user.controller';
import { JwtStrategy } from './guard/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { UserGuard } from './guard/user.guard';
import { RoleGuard } from './guard/role.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/model/user.entity';
import { IUserRepository } from './infrastructure/port';
import { UserRepository } from './infrastructure/adapter/user.repository';
import { IUserService, IUserUsecase } from './application/port';
import { UserService, UserUsecase } from './application/adapter';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([UserEntity])],
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
    { provide: IUserRepository, useClass: UserRepository },
    { provide: IUserService, useClass: UserService },
    { provide: IUserUsecase, useClass: UserUsecase },
  ],
  controllers: [UserController],
})
export class UserModule {}
