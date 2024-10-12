import {Request, Response} from "express";
import {categories} from "../models/Category";

export class CategoryController {

    static saveCategory(req: Request, res: Response) {
        const {name} = req.body;

        const category = categories.find(u => u.name === name);

        if (category) {
            res.status(422).json({message: 'Category already exists'});
            return;
        }

        categories.push({
            id: categories.length + 1,
            name,
        });

        res.json({message: 'Category created successfully'});
    }
}
