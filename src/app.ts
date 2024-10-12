import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import {AuthController} from './controllers/AuthController';
import {OpenController} from './controllers/OpenController';
import {ProtectedController} from './controllers/ProtectedController';
import {AdminController} from './controllers/AdminController';
import {authenticateJWT} from './middlewares/authMiddleware';
import {authorizeRole} from './middlewares/roleMiddleware';
import cors from 'cors';
import {Role} from "./enums/RoleEnum";
import {UserController} from "./controllers/UserController";
import {CategoryController} from "./controllers/CategoryController";

const app = express();

app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', OpenController.helloWorld);

app.post('/user/sign-up', UserController.signUpUser);
app.post('/seller/sign-up', UserController.signUpSeller);
app.put('/user/forget-password', UserController.forgetPassword);

app.post('/login', AuthController.login);
app.post('/logout', AuthController.logout);

app.post('/category', authenticateJWT, authorizeRole(Role.ADMIN), CategoryController.saveCategory);

app.get('/protected', authenticateJWT, ProtectedController.getUserInfo);

app.get('/admin/users', authenticateJWT, authorizeRole(Role.ADMIN), AdminController.getAllUsers);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
