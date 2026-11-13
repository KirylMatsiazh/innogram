import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

const normalizeEmail = ({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value;

export class LoginDTO{
    @IsNotEmpty()
    @Transform(normalizeEmail)
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}