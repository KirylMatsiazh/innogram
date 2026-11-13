import { LoginResponseDTO } from "../dto/login-response.dto.js";
import { LoginDTO } from "../dto/login.dto.js";
import { RegisterDTO } from "../dto/register.dto.js";
import { AppError } from "../error/app-error.js";
import { userStore } from "../store/user.store.js";
import { passwordUtil } from "../util/password.util.js";

const dummyHash = await passwordUtil.hashPassword('random-string');

class AuthenticationService{

    async register(dto: RegisterDTO): Promise<void> {
        if(await userStore.findByEmail(dto.email)){
            throw new AppError(409, `Account with ${dto.email} email already exists.`);
        }

        const passwordHash = await passwordUtil.hashPassword(dto.password);

        await userStore.create({
            email: dto.email,
            username: dto.username,
            passwordHash: passwordHash
        });
    }

    async login(dto: LoginDTO): Promise<LoginResponseDTO>{
        const user = await userStore.findByEmail(dto.email);

        if(!user){
            await passwordUtil.comparePassword(dto.password, dummyHash) //prevents timing difference
            throw new AppError(401, "Invalid credentials");
        } else if (!await passwordUtil.comparePassword(dto.password, user.passwordHash)){
            throw new AppError(401, "Invalid credentials");
        }

        return {
            email: user.email,
            username: user.username,
            id: user.userId
        }
    }

}

export const authenticationService = new AuthenticationService();