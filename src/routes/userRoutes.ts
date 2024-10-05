import {Request, Response, Router} from 'express';
import {randomUUID} from "node:crypto";
import bcrypt from 'bcrypt';
import {User} from "../model/user";
import {UserCreateRequestDto, UserGetResponseDto} from "../dto/UserDto";

let users: User[] = [
    {
        id: '1',
        username: 'test',
        fullName: 'Test User',
        email: 'test@gmail.com',
        phone: '1234567890',
        address: '123 Test St',
        password: 'test',
        created: new Date(),
        updated: new Date()
    }
];

const userRouter = Router();

userRouter.get('/all', (req: Request, res: Response<UserGetResponseDto[]>) => {
    let response: UserGetResponseDto[] = users.map(user => <UserGetResponseDto>{
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        created: user.created,
        updated: user.updated
    });

    res.json(response);
});

userRouter.get('/:id', (req: Request, res: Response<UserGetResponseDto | String>) => {
    const id: string = req.params.id;

    const user: User | undefined = users.find(u => u.id === id);

    if (!user) {
        res.status(404).send('User not found');
    }

    let response: UserGetResponseDto = <UserGetResponseDto>{
        id: user?.id,
        username: user?.username,
        fullName: user?.fullName,
        email: user?.email,
        phone: user?.phone,
        address: user?.address,
        created: user?.created,
        updated: user?.updated
    };

    res.json(response);
});

userRouter.post('/client', async (req: Request<UserCreateRequestDto>, res: Response) => {
    const request: UserCreateRequestDto = req.body;

    if (!request.username || !request.password || !request.email || !request.fullName || !request.phone || !request.address) {
        res.status(400).send('Fields required');
    }

    let user: User = <User>{
        id: randomUUID(),
        username: request.username,
        fullName: request.fullName,
        email: request.email,
        phone: request.phone,
        address: request.address,
        password: await bcrypt.hash(request.password, 10),
        created: new Date(),
        updated: new Date()
    };

    users.push(user);

    res.status(201).send('User created');
});

export default userRouter;
