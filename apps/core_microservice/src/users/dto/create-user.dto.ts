import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiPropertyOptional({
        description: 'User role',
        example: 'User',
        default: 'User',
    })
    @IsString()
    @IsOptional()
    role?: string;

    @ApiPropertyOptional({
        description: 'Whether the user is disabled',
        example: false,
        default: false,
    })
    @IsBoolean()
    @IsOptional()
    disabled?: boolean;
}