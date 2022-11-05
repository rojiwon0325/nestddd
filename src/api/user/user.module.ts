import { AccountModule } from '@ACCOUNT/account.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './application/adapter/user.service';
import { UserUsecase } from './application/adapter/user.usecase';
import { UserEntity } from './infrastructure/adapter/user.entity';
import { UserEntityMapper } from './infrastructure/adapter/user.mapper';
import { UserRepository } from './infrastructure/adapter/user.repository';
import { UserController } from './presentation/web/user.controller';

@Module({
  imports: [AccountModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [UserEntityMapper, UserRepository, UserService, UserUsecase],
  controllers: [UserController],
})
export class UserModule {}
