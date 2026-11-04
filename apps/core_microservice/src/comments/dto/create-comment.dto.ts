import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
    @ApiProperty({
        description: 'Comment content',
        example: 'Great post!',
    })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({
        description: 'UUID of the post',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid',
    })
    @IsUUID('4')
    @IsNotEmpty()
    postId: string;

    @ApiProperty({
        description: 'UUID of the profile',
        example: '550e8400-e29b-41d4-a716-446655440001',
        format: 'uuid',
    })
    @IsUUID('4')
    @IsNotEmpty()
    profileId: string;

    @ApiProperty({
        description: 'UUID of the user creating the comment',
        example: '550e8400-e29b-41d4-a716-446655440002',
        format: 'uuid',
    })
    @IsUUID('4')
    @IsNotEmpty()
    createdById: string;
}