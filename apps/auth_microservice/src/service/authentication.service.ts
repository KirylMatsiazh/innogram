import { randomUUID } from "node:crypto";
import { LoginDTO } from "../dto/login.dto.js";
import { RegisterDTO } from "../dto/register.dto.js";
import { AppError } from "../error/app-error.js";
import { userStore } from "../store/user.store.js";
import { passwordUtil } from "../util/password.util.js";
import { tokenUtil } from "../util/token.util.js";
import { AuthResultDTO } from "../dto/auth-result.dto.js";

const dummyHash = await passwordUtil.hashPassword('random-string');

function buildAuthResult(account: { userId: string; email: string; username: string }): AuthResultDTO {
    return {
        user: { // account will hold a full user info including password hash, so not returning raw account
            email: account.email,
            username: account.username,
            id: account.userId
        },
        accessToken: tokenUtil.createAccessToken(account.userId),
        refreshToken: tokenUtil.createRefreshToken(account.userId)
    }
}

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

    async login(dto: LoginDTO): Promise<AuthResultDTO>{
        const user = await userStore.findByEmail(dto.email);

        const hashToCompare = user?.passwordHash ?? dummyHash;
        const compareResult = await passwordUtil.comparePassword(dto.password, hashToCompare);

        if(!user || !user.passwordHash || !compareResult){
            throw new AppError(401, "Invalid credentials");
        }

        return buildAuthResult(user);
    }

    //-------------------------GOOGLE---------------------------------

    async signInWithGoogle(signInData: {sub: string, email: string}): Promise<AuthResultDTO>{
        const lowerCaseEmail = signInData.email.toLowerCase();
        const googleUser = await userStore.findByProvider('google', signInData.sub);

        if(googleUser){
            return buildAuthResult(googleUser);
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

        return buildAuthResult(newUser);
        
    }
}

export const authenticationService = new AuthenticationService();