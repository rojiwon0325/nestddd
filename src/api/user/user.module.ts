import { AuthModule } from 'src/api/auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './application/adapter/user.service';
import { UserUsecase } from './application/adapter/user.usecase';
import { UserEntityMapper } from './infrastructure/adapter/user.mapper';
import { UserRepository } from './infrastructure/adapter/user.repository';
import { UserEntity } from './infrastructure/model/user.entity';
import { UserController } from './presentation/web/user.controller';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [UserEntityMapper, UserRepository, UserService, UserUsecase],
  controllers: [UserController],
})
export class UserModule {}
