import { IsString, IsOptional, IsBoolean, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
     @ApiPropertyOptional({
        description: 'Profile display name',
        example: 'John Doe',
        maxLength: 100,
    })
    @IsString()
    @MaxLength(100)
    @IsOptional()
    displayName?: string;

     @ApiPropertyOptional({
        description: 'Profile biography',
        example: 'Software developer',
    })
    @IsString()
    @IsOptional()
    bio?: string;

     @ApiPropertyOptional({
        description: 'Profile avatar URL',
        example: 'https://example.com/avatar.png',
        maxLength: 500,
    })
    @IsString()
    @MaxLength(500)
    @IsOptional()
    avatarUrl?: string;

     @ApiPropertyOptional({
        description: 'Whether the profile is public',
        example: true,
    })
    @IsBoolean()
    @IsOptional()
    isPublic?: boolean;
}