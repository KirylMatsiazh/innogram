import redisClient from "../config/redis.js"

function key(tokenId: string){
    return `refresh:${tokenId}`;
}

class SessionStore{
    async save(tokenId: string, userId: string, expiresAt: number): Promise<void>{
        await redisClient.set(
            key(tokenId),
            userId,
            {expiration: { type: 'EXAT', value: expiresAt }}
        )
    }

    async getUserId(tokenId: string): Promise<string | null>{
        const userId = await redisClient.get(key(tokenId));
        if(!userId){
            return null;
        }
        return userId;
    }

    async remove(tokenId: string): Promise<boolean>{
        const deletedSessionsNumber = await redisClient.del(key(tokenId));
        if(deletedSessionsNumber !== 1){
            return false;
        }
        return true;
    }
}

export const sessionStore = new SessionStore()