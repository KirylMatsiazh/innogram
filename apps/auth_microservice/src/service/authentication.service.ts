import { randomUUID } from "node:crypto";
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
            passwordHash: passwordHash,
            provider: 'local'
        });
    }

    async login(dto: LoginDTO): Promise<LoginResponseDTO>{
        const user = await userStore.findByEmail(dto.email);

        const hashToCompare = user?.passwordHash ?? dummyHash;
        const compareResult = await passwordUtil.comparePassword(dto.password, hashToCompare);

        if(!user || !user.passwordHash || !compareResult){
            throw new AppError(401, "Invalid credentials");
        }

        return {
            email: user.email,
            username: user.username,
            id: user.userId
        }
    }

    //-------------------------GOOGLE---------------------------------

    async signInWithGoogle(signInData: {sub: string, email: string}): Promise<LoginResponseDTO>{
        const lowerCaseEmail = signInData.email.toLowerCase();
        const googleUser = await userStore.findByProvider('google', signInData.sub);

        if(googleUser){
            return {
                email: googleUser.email,
                username: googleUser.username,
                id: googleUser.userId
            }
        }
        if(await userStore.findByEmail(lowerCaseEmail)){
            throw new AppError(409, 'An account with this email already exists. Sign in with your password.')
        }

        const username = lowerCaseEmail.split('@')[0].replace(/[^a-zA-Z0-9_.]/g, '').substring(0, 20) + `_${randomUUID().slice(0, 6)}`;
        const newUser = await userStore.create({
            email: lowerCaseEmail,
            username: username,
            provider: 'google',
            providerId: signInData.sub
        }) 

        return {
            email: newUser.email,
            username: newUser.username,
            id: newUser.userId
        }
        
    }

}

export const authenticationService = new AuthenticationService();