import redisClient, {
    connectRedis,
    disconnectRedis
} from './config/redis.js';

async function testRedis() {
    try {
        await connectRedis();
        console.log(await redisClient.ping());
    } catch (error) {
        console.error(error);
    } finally {
        await disconnectRedis();
    }
}

testRedis();