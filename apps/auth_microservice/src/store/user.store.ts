import { randomUUID, UUID } from "crypto";
import { AppError } from "../error/app-error.js";

class InMemoryUserProfile{
    constructor(
        email: string,
        username: string,
        passwordHash: string,
    ){
        this.email = email;
        this.username = username;
        this.passwordHash = passwordHash;
        this.userId = randomUUID();
    }

    email: string;
    username: string;
    passwordHash: string;
    userId: UUID;
}

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

    async create(data: {email: string, username: string, passwordHash: string}): Promise<InMemoryUserProfile>{
        if(this.storage.has(data.email)){
            throw new AppError(409, `Account with ${data.email} email already exists.`);
        }
        this.storage.forEach((p) => {
            if(p.username.toLowerCase() === data.username.toLowerCase()){
                throw new AppError(409, `Username "${data.username}" is already in use.`);
            }
        })

        const profile = new InMemoryUserProfile(data.email, data.username, data.passwordHash);

        this.storage.set(profile.email, profile);
        return profile;
    }
}

export const userStore = new InMemoryUserStore();