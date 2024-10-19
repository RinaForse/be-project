import { Role } from "../enums/RoleEnum";
import { hashPassword } from "../utils/hashUtils";
import { randomUUID } from "node:crypto";

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

export const users: User[] = [
  {
    id: randomUUID().toString(),
    username: "admin",
    password: hashPassword("admin"),
    role: Role.ADMIN,
    firstName: "Admin",
    lastName: "Admin",
    phone: "1234567890",
    email: "admin@gmail.com",
    address: "Admin Street",
    createdDate: new Date(),
    updatedDate: new Date(),
    avatar: "",
  },
  {
    id: randomUUID().toString(),
    username: "user",
    password: hashPassword("user"),
    role: Role.USER,
    firstName: "User",
    lastName: "User",
    phone: "1234567890",
    email: "User@gmail.com",
    address: "User Street",
    createdDate: new Date(),
    updatedDate: new Date(),
    avatar: "",
  },
  {
    id: randomUUID().toString(),
    username: "seller",
    password: hashPassword("seller"),
    role: Role.SELLER,
    firstName: "Seller",
    lastName: "Seller",
    phone: "1234567890",
    email: "Seller@gmail.com",
    address: "Seller Street",
    createdDate: new Date(),
    updatedDate: new Date(),
    avatar: "",
  },
];
