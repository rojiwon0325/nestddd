import { UserEntity } from './infrastructure/adapter/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntityMapper } from './infrastructure/adapter/user.mapper';
import { UserRepository } from './infrastructure/adapter/user.repository';
import { UserService } from './application/adapter/user.service';
import { UserUsecase } from './application/adapter/user.usecase';
import { UserController } from './presentation/web/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserEntityMapper, UserRepository, UserService, UserUsecase],
  controllers: [UserController],
})
export class UserModule {}
