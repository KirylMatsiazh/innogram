import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DatabaseModule } from './database/typeorm.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { PostsModule } from './posts/posts.module.js';
import { CommentsModule } from './comments/comments.module.js';
import { ChatsModule } from './chats/chats.module.js';
import { NotificationsModule } from './notifications/notifications.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: [
    '../../.env',
    '.env',
  ],}),
    DatabaseModule,
    AuthModule,
    UsersModule,
    PostsModule,
    CommentsModule,
    ChatsModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}