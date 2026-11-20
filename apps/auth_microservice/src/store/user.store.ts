import { randomUUID, UUID } from "crypto";
import { AppError } from "../error/app-error.js";

//IN-MEMORY DATA
class InMemoryUserProfile{
    constructor(
        email: string,
        username: string,
        provider: 'local' | 'google' = 'local',
        passwordHash?: string,
        providerId?: string
    ){
        this.email = email;
        this.username = username;
        this.passwordHash = passwordHash;
        this.userId = randomUUID();
        this.provider = provider;
        this.providerId = providerId;
    }

    email: string;
    username: string;
    passwordHash?: string;
    userId: UUID;
    provider: 'local' | 'google';
    providerId?: string;
}

//IN-MEMORY STORAGE
class InMemoryUserStore {
    constructor(){
        this.storage = new Map<string, InMemoryUserProfile>();
    }

    private storage: Map<string, InMemoryUserProfile>;

    async findByEmail(email: string): Promise<InMemoryUserProfile | null>{
        const result = this.storage.get(email);

        if(!result){
            return null;
        }

        return result;
    }

    //FIND BY PROVIDER
    async findByProvider(provider: 'local' | 'google', providerId: string): Promise<InMemoryUserProfile | null>{
        for(const p of this.storage.values()){
            if(p.provider === provider && p.providerId === providerId){
                return p;
            }
        }

        return null;
    }

    //CREATE USER
    async create(
        data: {
            email: string,
            username: string,
            passwordHash?: string,
            provider: 'local' | 'google',
            providerId?: string
        }
    ): Promise<InMemoryUserProfile>{
        if(this.storage.has(data.email)){
            throw new AppError(409, `Account with ${data.email} email already exists.`);
        }
        this.storage.forEach((p) => {
            if(p.username.toLowerCase() === data.username.toLowerCase()){
                throw new AppError(409, `Username "${data.username}" is already in use.`);
            }
        })

        const profile = new InMemoryUserProfile(
            data.email,
            data.username,
            data.provider,
            data.passwordHash,
            data.providerId
        );

        this.storage.set(profile.email, profile);
        return profile;
    }
}

export const userStore = new InMemoryUserStore();