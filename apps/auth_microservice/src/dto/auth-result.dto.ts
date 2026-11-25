import { LoginResponseDTO } from "./login-response.dto.js";

export interface AuthResultDTO{
    user: LoginResponseDTO;
    accessToken: string;
    refreshToken: string;
}