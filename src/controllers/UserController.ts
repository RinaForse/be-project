import {Request, Response} from 'express';
import {users} from '../models/User';
import {hashPassword} from '../utils/hashUtils';
import {Role} from "../enums/RoleEnum";
import {UserCreateDto} from "../dto/UserCreateDto";
import {randomUUID} from "node:crypto";
import {UserForgetPasswordDto} from "../dto/UserForgetPasswordDto";

export class UserController {

    static signUpUser(req: Request<UserCreateDto>, res: Response) {
        UserController.createUser(req, res, Role.USER);

        res.json({message: 'User created successfully'});
    }

    static signUpSeller(req: Request<UserCreateDto>, res: Response) {
        UserController.createUser(req, res, Role.SELLER);

        res.json({message: 'Seller created successfully'});
    }

    static forgetPassword(req: Request<UserForgetPasswordDto>, res: Response) {
        const {username, newPassword, confirmPassword} = req.body;
        const user = users.find(u => u.username === username);

        if (newPassword !== confirmPassword) {
            res.status(400).json({message: 'Passwords do not match'});
            return;
        }

        if (!user) {
            res.status(404).json({message: 'User not found'});
            return;
        }

        user.password = hashPassword(newPassword);

        users[users.indexOf(user)] = user;

        res.json({message: 'Reset password link sent successfully'});
    }

    private static createUser(req: Request<UserCreateDto>, res: Response, role: Role) {
        console.log(req.body);
        const {username, password, confirmPassword, firstName, lastName, phone, email, address, avatar} = req.body;

        if (password !== confirmPassword) {
            res.status(400).json({message: 'Passwords do not match'});
            return;
        }

        const user = users.find(u => u.username === username);

        if (user) {
            res.status(422).json({message: 'Username already exists'});
            return;
        }

        users.push({
            id: randomUUID().toString(),
            username,
            password: hashPassword(password),
            firstName,
            lastName,
            phone,
            email,
            address,
            role,
            createdDate: new Date(),
            updatedDate: new Date(),
            avatar
        });
    }
}
