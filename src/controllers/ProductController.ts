import { categories } from "../models/Category";
import { products } from "../models/Product";
import { Request, Response } from "express";

export class ProductController {
  static saveProduct(req: Request, res: Response) {
    const { name, price, description, categoryId } = req.body;

    const product = products.find((u) => u.name === name);

    if (product) {
      res.status(422).json({ message: "Product already exists" });
      return;
    }

    const category = categories.find((c) => c.id === categoryId);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    const newProduct = {
      id: products.length + 1,
      name,
      price,
      description,
      category,
    };

    products.push(newProduct);

    res.json({
      message: "Product created successfully",
      product: {
        id: newProduct.id,
        name: newProduct.name,
        price: newProduct.price,
        description: newProduct.description,
        category: newProduct.category,
      },
    });
  }
  static getProduct(req: Request, res: Response) {
    const { name } = req.params;
    const product = products.find((p) => p.name === name);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(product);
  }

  static updateProduct(req: Request, res: Response) {
    const { name } = req.params;
    const { price, description, categoryId } = req.body;

    if (!name) {
      res.status(422).json({ message: "Name is required" });
      return;
    }
    const product = products.find((p) => p.name === name);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    if (name !== undefined) {
      product.name = name;
    }
    if (price !== undefined) {
      product.price = price;
    }

    if (description !== undefined) {
      product.description = description;
    }
    if (categoryId !== undefined) {
      const category = categories.find((c) => c.id === categoryId);
      if (!category) {
        res.status(404).json({ message: "Category not found" });
        return;
      }
      product.category = category;
    }

    res.json({
      message: "Product updated successfully",
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
    });
  }
  static deleteProduct(req: Request, res: Response) {
    const { name } = req.params;

    const product = products.find((p) => p.name === name);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const updatedProducts = products.filter((p) => p.name !== name);

    products.length = 0;
    products.push(...updatedProducts);

    res.json({ message: "Product deleted successfully" });
  }

  static getAllProducts(req: Request, res: Response) {
    res.json(products);
  }
}
