import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule, ApiModule],
})
export class AppModule {}
