import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePostDto {
    @ApiPropertyOptional({
        description: 'Updated post content',
        example: 'Updated post content',
    })
    @IsString()
    @IsOptional()
    content?: string;

    @ApiPropertyOptional({
        description: 'Whether the post is archived',
        example: true,
    })
    @IsBoolean()
    @IsOptional()
    isArchived?: boolean;
}