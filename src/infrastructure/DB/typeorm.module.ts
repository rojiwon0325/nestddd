import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule as OriginalOrmModule } from '@nestjs/typeorm';

export const TypeOrmModule = OriginalOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService<IEnv, true>) => ({
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: parseInt(configService.get('DB_PORT')),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    synchronize: true,
    logging: false,
    entities:
      configService.get('NODE_ENV') === 'test'
        ? ['src/**/*.entity{.ts,.js}']
        : ['dist/**/*.entity{.ts,.js}'],
  }),
});
