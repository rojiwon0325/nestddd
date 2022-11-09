import { APP_GUARD } from '@nestjs/core';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@USER/infrastructure/adapter/user.entity';
import { AuthRepository } from './infrastructure/adapter/auth.repository';
import { JwtStrategy } from './provider/strategy/jwt.strategy';
import { JwtAuthGuard } from './provider/guard/jwt.guard';
import { RoleGuard } from './provider/guard/role.guard';
import { AuthService } from './application/adapter/auth.service';
import { AuthUsecase } from './application/adapter/auth.usecase';
import { AuthController } from './presentation/web/auth.controller';

@Global()
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
    AuthRepository,
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
