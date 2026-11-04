import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post as PostEntity } from '../database/entities/post.entity.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>,
    ) {}

    async createPost(postData: CreatePostDto): Promise<PostEntity> {
    const post = this.postRepository.create({
        content: postData.content,
        isArchived: postData.isArchived ?? false,
        profile: { id: postData.profileId },
        createdBy: { id: postData.createdById },
        updatedAt: new Date(),
    });

    return this.postRepository.save(post);
}

    async findAllPosts(): Promise<PostEntity[]> {
        return this.postRepository.find({
            order: { createdAt: 'DESC' },
        });
    }

    async findPostById(id: string): Promise<PostEntity> {
        const post = await this.postRepository.findOneBy({ id });
        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }
        return post;
    }

    async updatePost(id: string, postData: UpdatePostDto): Promise<PostEntity> {
        const post = await this.findPostById(id);
        Object.assign(post, postData);
        return this.postRepository.save(post);
    }

    async deletePost(id: string): Promise<{ deleted: boolean }> {
        const post = await this.findPostById(id);
        await this.postRepository.remove(post);
        return { deleted: true };
    }
}