import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/infrastructure/model/user.entity';
import { AuthService } from './application/adapter/auth.service';
import { AuthUsecase } from './application/adapter/auth.usecase';
import { AuthMapper } from './infrastructure/adapter/auth.mapper';
import { AuthRepository } from './infrastructure/adapter/auth.repository';
import { AuthController } from './presentation/web/auth.controller';
import { JwtAuthGuard } from './provider/guard/jwt.guard';
import { RoleGuard } from './provider/guard/role.guard';
import { JwtStrategy } from './provider/strategy/jwt.strategy';
import { LocalStrategy } from './provider/strategy/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<IEnv, true>) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRESIN') },
      }),
    }),
  ],
  providers: [
    AuthMapper,
    AuthRepository,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    AuthService,
    AuthUsecase,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
