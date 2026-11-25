import jwt from "jsonwebtoken"
import { jwtConfig } from "../config/jwt.js"
import { randomUUID } from "crypto"
import { AppError } from "../error/app-error.js";

class TokenUtil{
    createAccessToken(userId: string): string{
        const accessToken = jwt.sign(
            {},
            jwtConfig.accessSecret,
            {
                algorithm: "HS256",
                expiresIn: jwtConfig.accessExpiresIn,
                subject: userId
            }
        )

        return accessToken;
    }

    createRefreshToken(userId: string): {token: string, tokenId: string, expiresAt: number}{
        const jwtid = randomUUID();
        const refreshToken = jwt.sign(
            {},
            jwtConfig.refreshSecret,
            {
                algorithm: "HS256",
                expiresIn: jwtConfig.refreshExpiresIn,
                subject: userId,
                jwtid: jwtid
            }
        )
        const jwtData = jwt.decode(refreshToken);
        if(typeof jwtData !== 'object' || typeof jwtData?.exp !== 'number'){
            throw new Error('jwtData is invalid');
        }

        const exp = jwtData.exp;

        return {
            token: refreshToken,
            tokenId: jwtid,
            expiresAt: exp
        };
    }

    verifyAccessToken(token: string): { userId: string }{
        let verifyResult;

        try{
            verifyResult = jwt.verify(
                token,
                jwtConfig.accessSecret,
                {
                    algorithms: ['HS256']
                }
            ) 
        }
        catch(error){
            if(error instanceof jwt.TokenExpiredError){
                throw new AppError(401, 'Access token expired.');
            }
            throw new AppError(401, 'Invalid access token.');
        }

        if(typeof verifyResult === 'string' || !verifyResult.sub || typeof verifyResult.sub !== 'string'){
            throw new AppError(401, 'Invalid access token.');
        }

        return {
            userId: verifyResult.sub
        }
    }

    verifyRefreshToken(token: string): { userId: string, tokenId: string }{
        let verifyResult;

        try{
            verifyResult = jwt.verify(
                token,
                jwtConfig.refreshSecret,
                {
                    algorithms: ['HS256']
                }
            )
        }
        catch(error){
            if(error instanceof jwt.TokenExpiredError){
                throw new AppError(401, 'Refresh token expired.');
            }
            throw new AppError(401, 'Invalid refresh token.');
        }

        if(typeof verifyResult === 'string' || !verifyResult.sub || !verifyResult.jti || typeof verifyResult.jti !== 'string'){
            throw new AppError(401, 'Invalid refresh token.');
        }

        return {
            userId: verifyResult.sub,
            tokenId: verifyResult.jti
        }
    }
}

export const tokenUtil = new TokenUtil();