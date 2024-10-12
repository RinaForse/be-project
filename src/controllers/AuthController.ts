import {Request, Response} from 'express';
import {users} from '../models/User';
import {hashPassword} from '../utils/hashUtils';
import {signJwt} from '../utils/jwtUtils';

export class AuthController {
    static login(req: Request, res: Response) {
        const {username, password} = req.body;

        const hashedPassword = hashPassword(password);

        const user = users.find(u => u.username === username && u.password === hashedPassword);

        if (user) {
            const token = signJwt({username: user.username, role: user.role});

            res.cookie('token', token, {httpOnly: true});
            res.json({message: 'Logged in successfully'});
        } else {
            res.status(401).json({message: 'Invalid credentials'});
        }
    }

    static logout(req: Request, res: Response) {
        res.clearCookie('token');
        res.json({message: 'Logged out successfully'});
    }
}
