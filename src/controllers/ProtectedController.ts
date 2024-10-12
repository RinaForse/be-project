import {Request, Response} from 'express';

export class ProtectedController {
    static getUserInfo(req: Request, res: Response) {
        if (req.user) {
            res.json(req.user);
        } else {
            res.status(401).json({message: 'Unauthorized'});
        }
    }
}
