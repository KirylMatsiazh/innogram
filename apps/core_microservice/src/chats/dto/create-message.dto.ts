import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMessageDto {
    @ApiProperty({
        description: 'Message content',
        example: 'Hello everyone!',
    })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({
        description: 'UUID of the profile sending the message',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid',
    })
    @IsUUID('4')
    @IsNotEmpty()
    profileId: string;

    @ApiPropertyOptional({
        description: 'UUID of the message being replied to',
        example: '550e8400-e29b-41d4-a716-446655440001',
        format: 'uuid',
    })
    @IsUUID('4')
    @IsOptional()
    replyToMessageId?: string;

    @ApiProperty({
        description: 'UUID of the user creating the message',
        example: '550e8400-e29b-41d4-a716-446655440002',
        format: 'uuid',
    })
    @IsUUID('4')
    @IsNotEmpty()
    createdBy: string;
}