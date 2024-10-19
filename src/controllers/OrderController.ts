import { Request, Response } from "express";
import { orders } from "../models/Order";

export class OrderController {
  static createOrder(req: Request, res: Response) {
    const { productId, userId, price, count } = req.body;

    if (
      !productId ||
      !userId ||
      typeof price !== "number" ||
      typeof count !== "number"
    ) {
      res.status(400).json({ message: "Invalid input data" });
      return;
    }

    const newOrder = {
      id: orders.length + 1,
      productId,
      userId,
      price,
      count,
    };

    orders.push(newOrder);

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  }

  static getOrder(req: Request, res: Response) {
    const { id } = req.params;

    const order = orders.find((o) => o.id === parseInt(id));
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    res.json(order);
  }

  static updateOrder(req: Request, res: Response) {
    const { id } = req.params;
    const { productId, price, count, userId } = req.body;

    const order = orders.find((o) => o.id === parseInt(id));
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    if (price !== undefined) {
      order.price = price;
    }
    if (count !== undefined) {
      order.count = count;
    }
    if (productId !== undefined) {
      order.productId = productId;
    }
    if (userId !== undefined) {
      order.userId = userId;
    }

    res.json({
      message: "Order updated successfully",
      order: order,
    });
  }

  static deleteOrder(req: Request, res: Response) {
    const { id } = req.params;

    const index = orders.findIndex((o) => o.id === parseInt(id));
    if (index === -1) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    orders.splice(index, 1);

    res.json({ message: "Order deleted successfully" });
  }
}
