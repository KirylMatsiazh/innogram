import { IsString, IsNotEmpty, IsUUID, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
     @ApiProperty({
        description: 'Post content',
        example: 'My first post!',
    })
    @IsString()
    @IsNotEmpty()
    content: string;

     @ApiProperty({
        description: 'Profile UUID associated with the post',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid',
    })
    @IsUUID('4')
    @IsNotEmpty()
    profileId: string;

     @ApiProperty({
        description: 'UUID of the user creating the post',
        example: '550e8400-e29b-41d4-a716-446655440001',
        format: 'uuid',
    })
    @IsUUID('4')
    @IsNotEmpty()
    createdById: string;

    @ApiPropertyOptional({
        description: 'Whether the post is archived',
        example: false,
        default: false,
    })
    @IsBoolean()
    @IsOptional()
    isArchived?: boolean;
}