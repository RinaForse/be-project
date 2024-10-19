import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { AuthController } from "./controllers/AuthController";
import { OpenController } from "./controllers/OpenController";
import { ProtectedController } from "./controllers/ProtectedController";
import { AdminController } from "./controllers/AdminController";
import { authenticateJWT } from "./middlewares/authMiddleware";
import { authorizeRole } from "./middlewares/roleMiddleware";
import cors from "cors";
import { Role } from "./enums/RoleEnum";
import { UserController } from "./controllers/UserController";
import { CategoryController } from "./controllers/CategoryController";
import { ProductController } from "./controllers/ProductController";
import { OrderController } from "./controllers/OrderController";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", OpenController.helloWorld);

app.post("/user/sign-up", UserController.signUpUser);
app.post("/seller/sign-up", UserController.signUpSeller);
app.put("/user/forget-password", UserController.forgetPassword);

app.post("/login", AuthController.login);
app.post("/logout", AuthController.logout);

app.post(
  "/category",
  authenticateJWT,
  authorizeRole(Role.ADMIN),
  CategoryController.saveCategory
);
app.get(
  "/category/all",
  authenticateJWT,
  authorizeRole(Role.ADMIN),
  CategoryController.getAllCategories
);
app.get(
  "/category/:name",
  authenticateJWT,
  authorizeRole(Role.ADMIN),
  CategoryController.getCategory
);

app.put(
  "/category/update/:name",
  authenticateJWT,
  authorizeRole(Role.ADMIN),
  CategoryController.updateCategories
);
app.delete(
  "/category/delete/:name",
  authenticateJWT,
  authorizeRole(Role.ADMIN),
  CategoryController.deleteCategory
);

app.post(
  "/product",
  authenticateJWT,
  authorizeRole(Role.ADMIN),
  ProductController.saveProduct
);
app.get(
  "/product/all",
  authenticateJWT,
  authorizeRole(Role.ADMIN),
  ProductController.getAllProducts
);

app.get(
  "/product/:name",
  authenticateJWT,
  authorizeRole(Role.ADMIN),
  ProductController.getProduct
),
  app.put(
    "/product/update/:name",
    authenticateJWT,
    authorizeRole(Role.ADMIN),
    ProductController.updateProduct
  ),
  app.delete(
    "/product/delete/:name",
    authenticateJWT,
    authorizeRole(Role.ADMIN),
    ProductController.deleteProduct
  );

app.post(
  "/order/",
  authenticateJWT,
  authorizeRole(Role.USER),
  OrderController.createOrder
);
app.get(
  "/order/:id",
  authenticateJWT,
  authorizeRole(Role.ADMIN),
  OrderController.getOrder
);
app.put(
  "/order/update/:id",
  authenticateJWT,
  authorizeRole(Role.ADMIN),
  OrderController.updateOrder
);
app.delete(
  "/order/delete/:id",
  authenticateJWT,
  authorizeRole(Role.ADMIN),
  OrderController.deleteOrder
);

app.get("/protected", authenticateJWT, ProtectedController.getUserInfo);

app.get(
  "/admin/users",
  authenticateJWT,
  authorizeRole(Role.ADMIN),
  AdminController.getAllUsers
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
