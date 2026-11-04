import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ChatsService } from './chats.service.js';
import { Chat } from '../database/entities/chat.entity.js';
import { Message } from '../database/entities/message.entity.js';
import { CreateChatDto } from './dto/create-chat.dto.js';
import { CreateMessageDto } from './dto/create-message.dto.js';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
} from '@nestjs/swagger';

@ApiTags('Chats')
@Controller('chats')
export class ChatsController {
    constructor(private readonly chatsService: ChatsService) {}

    @Post()
    @ApiOperation({ summary: 'Create a chat' })
    @ApiResponse({ status: 201, description: 'Chat created' })
    @ApiResponse({ status: 400, description: 'Invalid request' })
    @ApiResponse({ status: 404, description: 'User not found' })
    createChat(@Body() chatData: CreateChatDto): Promise<Chat> {
        return this.chatsService.createChat(chatData);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get chat by ID' })
    @ApiParam({ name: 'id', description: 'Chat UUID' })
    @ApiResponse({ status: 200, description: 'Chat found' })
    @ApiResponse({ status: 404, description: 'Chat not found' })
    findChatById(@Param('id') id: string): Promise<Chat> {
        return this.chatsService.findChatById(id);
    }

    @Post(':id/messages')
    @ApiOperation({ summary: 'Create a message in a chat' })
    @ApiParam({ name: 'id', description: 'Chat UUID' })
    @ApiResponse({ status: 201, description: 'Message created' })
    @ApiResponse({ status: 404, description: 'Chat or reply message not found' })
    createMessage(
        @Param('id') chatId: string,
        @Body() messageData: CreateMessageDto,
    ): Promise<Message> {
        return this.chatsService.createMessage(chatId, messageData);
    }

    @Get(':id/messages')
    @ApiOperation({ summary: 'Get messages in a chat' })
    @ApiParam({ name: 'id', description: 'Chat UUID' })
    @ApiResponse({ status: 200, description: 'Messages returned' })
    @ApiResponse({ status: 404, description: 'Chat not found' })
    findMessagesByChat(@Param('id') chatId: string): Promise<Message[]> {
        return this.chatsService.findMessagesByChat(chatId);
    }
}
