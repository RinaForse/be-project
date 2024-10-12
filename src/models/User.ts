export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
    SELLER = 'SELLER'
}

export interface User {
    username: string;
    password: string;
    role: Role;
}

import {hashPassword} from '../utils/hashUtils';

export const users: User[] = [
    {
        username: 'admin',
        password: hashPassword('admin'),
        role: Role.ADMIN
    },
    {
        username: 'user',
        password: hashPassword('user'),
        role: Role.USER
    },
    {
        username: 'seller',
        password: hashPassword('seller'),
        role: Role.SELLER
    }
];
