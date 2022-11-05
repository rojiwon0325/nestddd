import { AccountModule } from '@ACCOUNT/account.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

@Module({
  imports: [AccountModule, UserModule],
})
export class ApiModule {}
