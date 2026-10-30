import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller.js';
import { ChatsService } from './chats.service.js';
import { Chat } from '../database/entities/chat.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../database/entities/message.entity.js';
import { User } from '../database/entities/user.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, Message, User])],
  controllers: [ChatsController],
  providers: [ChatsService]
})
export class ChatsModule {}
