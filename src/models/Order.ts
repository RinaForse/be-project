import { Product } from "./Product";

export interface Order {
  id: number;
  userId: number;
  productId: number;
  price: number;
  count: number;
}

export const orders: Order[] = [
  {
    id: 1,
    userId: 1,
    productId: 1,
    price: 699,
    count: 2,
  },
  {
    id: 2,
    userId: 1,
    productId: 3,
    price: 19,
    count: 1,
  },
];
