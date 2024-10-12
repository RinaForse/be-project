import {Request, Response} from 'express';
import {users} from '../models/User';

export class AdminController {
    static getAllUsers(req: Request, res: Response) {
        res.json(users.map(user => ({username: user.username, role: user.role})));
    }
}
