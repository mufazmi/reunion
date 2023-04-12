import jwt from 'jsonwebtoken';

const KEY_ACCESS_TOKEN: string = process.env.KEY_ACCESS_TOKEN || '';
const KEY_REFRESH_TOKEN: string = process.env.KEY_REFRESH_TOKEN || '';

class TokenService {


    public generateToken = (payload: any): { accessToken: string, refreshToken: string } => {
        const accessToken = jwt.sign(payload, KEY_ACCESS_TOKEN, {
            expiresIn: '1y',
        });
        const refreshToken = jwt.sign(payload, KEY_REFRESH_TOKEN, {
            expiresIn: '1y',
        });
        return { accessToken, refreshToken };
    }

    public verifyAccessToken = (token: string) => jwt.verify(token, KEY_ACCESS_TOKEN);

    public verifyRefreshToken = (token: string) => jwt.verify(token, KEY_REFRESH_TOKEN);

}

export default new TokenService();
