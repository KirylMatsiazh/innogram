import bcrypt from 'bcrypt'

class PasswordUtil{
    private static readonly saltRounds = 10;

    async hashPassword(password: string): Promise<string>{
        return await bcrypt.hash(password, PasswordUtil.saltRounds);
    };

    async comparePassword(password: string, hash: string): Promise<boolean>{
        return await bcrypt.compare(password, hash);
    }
}

export const passwordUtil = new PasswordUtil();