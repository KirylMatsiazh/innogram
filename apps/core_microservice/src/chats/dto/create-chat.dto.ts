import { IsString, IsNotEmpty, IsOptional, MaxLength, IsIn, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateChatDto {
    @ApiProperty({
        description: 'Chat name',
        example: 'My group chat',
        maxLength: 100,
    })
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional({
        description: 'Chat description',
        example: 'A chat for friends',
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({
        description: 'Chat type',
        enum: ['private', 'group'],
        example: 'private',
    })
    @IsString()
    @IsIn(['private', 'group'])
    @IsOptional()
    type?: string;

    @ApiProperty({
        description: 'UUID of the user creating the chat',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid',
    })
    @IsUUID('4')
    @IsNotEmpty()
    createdById: string;
}