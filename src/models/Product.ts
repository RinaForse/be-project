import { Category } from "./Category";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: Category;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Smartphone",
    price: 699,
    description:
      "Latest model with advanced features and high-resolution camera",
    category: {
      id: 1,
      name: "Electronics",
    },
  },
  {
    id: 2,
    name: "T-shirt",
    price: 29,
    description: "Comfortable cotton T-shirt, available in multiple colors",
    category: {
      id: 2,
      name: "Clothing",
    },
  },
  {
    id: 3,
    name: "Fiction Novel",
    price: 19,
    description: "Bestselling fiction novel by a popular author",
    category: {
      id: 3,
      name: "Books",
    },
  },
  {
    id: 4,
    name: "Vase",
    price: 120,
    description: "Elegant ceramic vase, perfect for any home decor",
    category: {
      id: 4,
      name: "Home",
    },
  },
  {
    id: 5,
    name: "Daisies",
    price: 25,
    description: "Fresh daisies, perfect for your garden",
    category: {
      id: 5,
      name: "Garden",
    },
  },
];
