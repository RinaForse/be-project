import {Request, Response, NextFunction} from 'express';
import {verifyJwt} from '../utils/jwtUtils';
import {User} from '../models/User';

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['token'];

    if (token) {
        const decoded = verifyJwt(token);

        if (decoded) {
            req.user = decoded as User;
            next();
        } else {
            res.status(401).json({message: 'Invalid token'});
        }
    } else {
        res.status(401).json({message: 'No token provided'});
    }
}
