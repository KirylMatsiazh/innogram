import { config } from 'dotenv';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { type SignOptions } from 'jsonwebtoken';

// Load the root .env file
const currentDir = dirname(fileURLToPath(import.meta.url));

config({
    path: resolve(currentDir, '../../../../.env')
});

function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`${name} is not set`);
    }
    return value;
}

export const jwtConfig = {
    accessSecret: requireEnv('JWT_SECRET'),
    refreshSecret: requireEnv('JWT_REFRESH_SECRET'),
    accessExpiresIn: requireEnv('JWT_EXPIRES_IN') as SignOptions['expiresIn'],
    refreshExpiresIn: requireEnv('JWT_REFRESH_EXPIRES_IN') as SignOptions['expiresIn'],
};