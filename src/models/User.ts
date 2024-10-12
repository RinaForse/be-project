import {Role} from "../enums/RoleEnum";

export interface User {
    id: string;
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phone: string;
    email: string;
    address?: string;
    role: Role;
    createdDate: Date;
    updatedDate: Date;
    avatar?: string;
}

import {hashPassword} from '../utils/hashUtils';
import {randomUUID} from "node:crypto";

export const users: User[] = [
    {
        id: randomUUID().toString(),
        username: 'admin',
        password: hashPassword('admin'),
        role: Role.ADMIN,
        firstName: 'Admin',
        lastName: 'Admin',
        phone: '1234567890',
        email: 'admin@gmail.com',
        address: 'Admin Street',
        createdDate: new Date(),
        updatedDate: new Date(),
        avatar: ''
    }
];
