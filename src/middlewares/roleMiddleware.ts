import {Request, Response, NextFunction} from 'express';
import {Role} from '../models/User';

export function authorizeRole(role: Role) {
    return function (req: Request, res: Response, next: NextFunction) {
        if (req.user && req.user.role === role) {
            next();
        } else {
            res.status(403).json({message: 'Forbidden'});
        }
    };
}
