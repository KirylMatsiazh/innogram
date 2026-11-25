import { config } from 'dotenv';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { OAuth2Client } from 'google-auth-library';

// Load the root .env file
const currentDir = dirname(fileURLToPath(import.meta.url));

config({
    path: resolve(currentDir, '../../../../.env')
});

export const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const callbackUrl = process.env.GOOGLE_CALLBACK_URL;

if (!clientId) {
    throw new Error('Google client ID is missing!');
}
if (!clientSecret) {
    throw new Error('Google client secret is missing!');
}
if (!callbackUrl) {
    throw new Error('Google callback URL is missing!');
}

export const googleClient = new OAuth2Client({
    clientId: clientId,
    clientSecret: clientSecret,
    redirectUri: callbackUrl
})

