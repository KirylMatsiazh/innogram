import redisClient, {
    connectRedis,
    disconnectRedis
} from './config/redis.ts';

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