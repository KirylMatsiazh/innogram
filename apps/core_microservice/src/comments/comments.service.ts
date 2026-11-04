import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../database/entities/comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
    ) {}

    async createComment(commentData: CreateCommentDto): Promise<Comment> {
        const comment = this.commentRepository.create({
            content: commentData.content,
            post: { id: commentData.postId },
            profile: { id: commentData.profileId },
            createdBy: { id: commentData.createdById },
            updatedAt: new Date(),
        });
    
        return this.commentRepository.save(comment);
    }

    async findCommentsByPost(postId: string): Promise<Comment[]> {
        return this.commentRepository.find({
            where: { post: { id: postId } },
            order: { createdAt: 'ASC' },
        });
    }

    async findCommentById(id: string): Promise<Comment> {
        const comment = await this.commentRepository.findOneBy({ id });
        if (!comment) {
            throw new NotFoundException(`Comment with ID ${id} not found`);
        }
        return comment;
    }

    async deleteComment(id: string): Promise<{ deleted: boolean }> {
        const comment = await this.findCommentById(id);
        await this.commentRepository.remove(comment);
        return { deleted: true };
    }
}