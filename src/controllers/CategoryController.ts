import { Request, Response } from "express";
import { categories } from "../models/Category";

export class CategoryController {
  static saveCategory(req: Request, res: Response) {
    const { name } = req.body;

    const category = categories.find((u) => u.name === name);

    if (category) {
      res.status(422).json({ message: "Category already exists" });
      return;
    }

    const newCategory = {
      id: categories.length + 1,
      name,
    };

    categories.push(newCategory);

    res.json({
      message: "Category created successfully",
      name: newCategory.name,
      id: newCategory.id,
    });
  }

  static getCategory(req: Request, res: Response) {
    const { name } = req.params;

    const category = categories.find((u) => u.name === name);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.json(category);
  }

  static updateCategories(req: Request, res: Response) {
    const { name } = req.params;
    if (!name) {
      res.status(422).json({ message: "Name is required" });
      return;
    }
    const category = categories.find((u) => u.name === name);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    category.name = name;

    res.json({
      message: "Category update successfully",
      name: category.name,
      id: category.id,
    });
  }

  static deleteCategory(req: Request, res: Response) {
    const { name } = req.params;

    const category = categories.find((u) => u.name === name);

    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    const updatedCategories = categories.filter((p) => p.name !== name);

    categories.length = 0;
    categories.push(...updatedCategories);

    res.json({ message: "Category deleted successfully" });
    return;
  }

  static getAllCategories(req: Request, res: Response) {
    res.json(categories);
  }
}
