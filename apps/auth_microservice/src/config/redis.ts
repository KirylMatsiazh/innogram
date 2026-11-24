import { createClient } from 'redis';
import { config } from 'dotenv';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Load the root .env file
const currentDir = dirname(fileURLToPath(import.meta.url));

config({
    path: resolve(currentDir, '../../../../.env')
});

// Get Redis connection URL
const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
    throw new Error('REDIS_URL is not defined');
}

// Create Redis client
const redisClient = createClient({
    url: redisUrl
});

// Handle connection errors
redisClient.on('error', (error) => {
    console.error('Redis Client Error:', error);
});

redisClient.on('ready', () => {
    console.log('Redis connection established');
});

// Connect to Redis
export async function connectRedis(): Promise<void> {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
}

// Disconnect from Redis
export async function disconnectRedis(): Promise<void> {
    if (redisClient.isOpen) {
        await redisClient.quit();
    }
}

// Export client for other modules
export default redisClient;
