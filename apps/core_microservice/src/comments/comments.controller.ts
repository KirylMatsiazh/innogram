import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { CommentsService } from './comments.service.js';
import { Comment } from '../database/entities/comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
} from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post()
    @ApiOperation({ summary: 'Create a comment' })
    @ApiResponse({ status: 201, description: 'Comment created' })
    @ApiResponse({ status: 400, description: 'Invalid request' })
    createComment(@Body() commentData: CreateCommentDto): Promise<Comment> {
        return this.commentsService.createComment(commentData);
    }

    @Get('post/:postId')
    @ApiOperation({ summary: 'Get comments by post' })
    @ApiParam({ name: 'postId', description: 'Post UUID' })
    @ApiResponse({ status: 200, description: 'Comments returned' })
    findCommentsByPost(@Param('postId') postId: string): Promise<Comment[]> {
        return this.commentsService.findCommentsByPost(postId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get comment by ID' })
    @ApiParam({ name: 'id', description: 'Comment UUID' })
    @ApiResponse({ status: 200, description: 'Comment found' })
    @ApiResponse({ status: 404, description: 'Comment not found' })
    findCommentById(@Param('id') id: string): Promise<Comment> {
        return this.commentsService.findCommentById(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete comment' })
    @ApiParam({ name: 'id', description: 'Comment UUID' })
    @ApiResponse({ status: 200, description: 'Comment deleted' })
    @ApiResponse({ status: 404, description: 'Comment not found' })
    deleteComment(@Param('id') id: string): Promise<{ deleted: boolean }> {
        return this.commentsService.deleteComment(id);
    }
}