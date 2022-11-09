import { AuthModule } from '@AUTH/auth.module';
import { Module } from '@nestjs/common';
import { UserModule } from '@USER/user.module';

@Module({
  imports: [AuthModule, UserModule],
})
export class ApiModule {}
