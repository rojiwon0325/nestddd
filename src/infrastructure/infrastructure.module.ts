import { Module } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from './DB/typeorm.module';
import { AllExceptionFilter } from './filter/all-exception.filter';
import { ValidationPipe } from './pipe/validation.pipe';

@Module({
  imports: [ConfigModule, TypeOrmModule],
  providers: [
    { provide: APP_FILTER, useClass: AllExceptionFilter },
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
export class InfrastructureModule {
  constructor(readonly dataSource: DataSource) {}
}
