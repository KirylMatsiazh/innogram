import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from '../database/entities/chat.entity.js';
import { Message } from '../database/entities/message.entity.js';
import { CreateChatDto } from './dto/create-chat.dto.js';
import { CreateMessageDto } from './dto/create-message.dto.js';
import { User } from '../database/entities/user.entity.js';

@Injectable()
export class ChatsService {
    constructor(
        @InjectRepository(Chat)
        private readonly chatRepository: Repository<Chat>,

        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    // CHATS
    async createChat(chatData: CreateChatDto): Promise<Chat> {
        const { createdById, ...chatFields } = chatData;

        const user = await this.userRepository.findOneBy({ id: createdById });

        if (!user) {
            throw new NotFoundException(`User with ID ${createdById} not found`);
        }

        const chat = this.chatRepository.create({
            ...chatFields,
            createdBy: user,
            updatedAt: new Date
        });

        return this.chatRepository.save(chat);
    }

    async findChatById(id: string): Promise<Chat> {
        const chat = await this.chatRepository.findOneBy({ id });
        if (!chat) {
            throw new NotFoundException(`Chat with ID ${id} not found`);
        }
        return chat;
    }

    // MESSAGES
    async createMessage(chatId: string, messageData: CreateMessageDto): Promise<Message> {
    await this.findChatById(chatId);

    if (messageData.replyToMessageId) {
        const replyMessage = await this.messageRepository.findOneBy({
            id: messageData.replyToMessageId,
            chatId: chatId,
        });

        if (!replyMessage) {
            throw new NotFoundException(
                'Reply message not found in this chat'
            );
        }
    }

    const message = this.messageRepository.create({
        ...messageData,
        chatId,
        updatedAt: new Date(),
    });

    return this.messageRepository.save(message);
}

    async findMessagesByChat(chatId: string): Promise<Message[]> {
        await this.findChatById(chatId); // Existence check

        return this.messageRepository.find({
            where: { chatId: chatId },
            order: { createdAt: 'ASC' },
        });
    }
}