import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { PostsService } from './posts.service.js';
import { Post as PostEntity } from '../database/entities/post.entity.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
} from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    @ApiOperation({ summary: 'Create a post' })
    @ApiResponse({ status: 201, description: 'Post created' })
    @ApiResponse({ status: 400, description: 'Invalid request' })
    createPost(@Body() postData: CreatePostDto): Promise<PostEntity> {
        return this.postsService.createPost(postData);
    }

    @Get()
    @ApiOperation({ summary: 'Get all posts' })
    @ApiResponse({ status: 200, description: 'Posts returned' })
    findAllPosts(): Promise<PostEntity[]> {
        return this.postsService.findAllPosts();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get post by ID' })
    @ApiParam({ name: 'id', description: 'Post UUID' })
    @ApiResponse({ status: 200, description: 'Post found' })
    @ApiResponse({ status: 404, description: 'Post not found' })
    findPostById(@Param('id') id: string): Promise<PostEntity> {
        return this.postsService.findPostById(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update post' })
    @ApiParam({ name: 'id', description: 'Post UUID' })
    @ApiResponse({ status: 200, description: 'Post updated' })
    @ApiResponse({ status: 404, description: 'Post not found' })
    updatePost(
        @Param('id') id: string,
        @Body() postData: UpdatePostDto,
    ): Promise<PostEntity> {
        return this.postsService.updatePost(id, postData);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete post' })
    @ApiParam({ name: 'id', description: 'Post UUID' })
    @ApiResponse({ status: 200, description: 'Post deleted' })
    @ApiResponse({ status: 404, description: 'Post not found' })
    deletePost(@Param('id') id: string): Promise<{ deleted: boolean }> {
        return this.postsService.deletePost(id);
    }
}