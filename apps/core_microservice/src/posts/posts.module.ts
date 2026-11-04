import { Module } from '@nestjs/common';
import { Post as PostEntity } from '../database/entities/post.entity.js'; 
import { PostsController } from './posts.controller.js';
import { PostsService } from './posts.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
