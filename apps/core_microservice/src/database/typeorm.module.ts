import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres' as const,
          host: configService.getOrThrow<string>('POSTGRES_HOST'),
          port: Number(configService.getOrThrow<string>('POSTGRES_PORT')),
          username: configService.getOrThrow<string>('POSTGRES_USER'),
          password: configService.get<string>('POSTGRES_PASSWORD'),
          database: configService.getOrThrow<string>('POSTGRES_DB'),

          migrations: ['src/database/migrations/*.ts'],
          autoLoadEntities: true,
          synchronize: false,
        };
      },
    }),
  ],
})
export class DatabaseModule {}