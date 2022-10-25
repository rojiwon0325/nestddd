import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './application/user.service';
import { UserEntity } from './infrastructure/user.entity';
import { UserEntityMapper } from './infrastructure/user.mapper';
import { UserRepository } from './infrastructure/user.repository';
import { UserController } from './presentation/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserEntityMapper, UserRepository, UserService],
  controllers: [UserController],
})
export class UserModule {}
