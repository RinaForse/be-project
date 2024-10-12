import {Request, Response} from 'express';

export class OpenController {
    static helloWorld(req: Request, res: Response) {
        res.send('Hello World');
    }
}
