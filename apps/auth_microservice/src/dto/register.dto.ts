import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsISO8601, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator'

const normalizeEmail = ({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value;


export class RegisterDTO{
    @IsNotEmpty()
    @Transform(normalizeEmail)
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(72)
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/, {message: 'Password must contain a lowercase letter, an uppercase letter, a digit and a special character'})
    password: string;
    
    @IsString()
    @MaxLength(100)
    @IsOptional()
    displayName?: string;

    @IsString()
    @IsOptional()
    bio?: string;

    @IsString()
    @MaxLength(500)
    @IsOptional()
    avatarUrl?: string;

    @IsBoolean()
    @IsOptional()
    isPublic?: boolean;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @Matches(/^[a-zA-Z0-9_.]{3,50}$/, {message: "Username must be a combination of letters, digits, _ or ."})
    username: string

    @IsISO8601({ strict: true })
    @IsNotEmpty()
    birthday: string
}