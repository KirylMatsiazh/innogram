import { UUID } from "crypto";

export interface LoginResponseDTO{
    id: UUID,
    email: string,
    username: string
}