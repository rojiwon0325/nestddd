import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './application/adapter/account.service';
import { AccountUsecase } from './application/adapter/account.usecase';
import { AccountEntity } from './infrastructure/adapter/account.entity';
import { AccountEntityMapper } from './infrastructure/adapter/account.mapper';
import { AccountRepository } from './infrastructure/adapter/account.repository';
import { AccountController } from './presentation/web/account.controller';
import { JwtAuthGuard } from './provider/guard/jwt.guard';
import { RoleGuard } from './provider/guard/role.guard';
import { JwtStrategy } from './provider/strategy/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity]),
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
    AccountEntityMapper,
    AccountRepository,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    AccountService,
    AccountUsecase,
  ],
  controllers: [AccountController],
  exports: [AccountService],
})
export class AccountModule {}
