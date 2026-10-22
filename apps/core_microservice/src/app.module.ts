import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DatabaseModule } from './database/typeorm.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: [
    '../../.env',
    '.env',
  ],}),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}