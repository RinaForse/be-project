import jwt from 'jsonwebtoken';

const JWT_SECRET = '652b0283-2388-471c-81c5-43e990a3c9f3';
const JWT_EXPIRATION = '1h';

export function signJwt(payload: object): string {
    return jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRATION});
}

export function verifyJwt(token: string): any {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch {
        return null;
    }
}
