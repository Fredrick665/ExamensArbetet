import express from "express";
import db from "../db/db.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { AdminAuth } from "../middlewares/AdminAuth.js";
import { loginUser } from "../controllers/LoginController.js";
import validateRequest from "../Validators/ValidateRequest.js";
import { validateSchema } from "../Validators/ValidateSchema.js";
import {
  loginSchema,
  updateRoleSchema,
  productSchema,
} from "../models/Schemas.js";
import {
  getOrders,
  getUserOrder,
  getMyOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  deleteAllOrders,
  updateMyOrder,
  deleteMyOrder,
} from "../controllers/OrderController.js";
import {
  getAllUsers,
  createUser,
  updateRole,
  deleteUser,
  deleteAllUsers,
  validateUser,
} from "../controllers/UserController.js";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
} from "../controllers/ProductController.js";

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const products = await db.collection("products").find().toArray();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
router.get("/users", verifyToken, AdminAuth, getAllUsers);
router.get("/orders", verifyToken, AdminAuth, getOrders);
router.get("/orders/:username", verifyToken, AdminAuth, getUserOrder);
router.get("/productsAdmin", verifyToken, AdminAuth, getProducts);
router.get("/myorders", verifyToken, getMyOrders);

router.post("/orders", verifyToken, createOrder);
router.post("/users", validateUser, createUser);
router.post("/login", validateRequest(loginSchema), loginUser);
router.post("/products", validateSchema(productSchema), createProduct);

router.put(
  "/users/:userId/role",
  verifyToken,
  AdminAuth,
  validateRequest(updateRoleSchema),
  updateRole
);
router.put("/products/:id", verifyToken, AdminAuth, updateProduct);
router.put("/updateMyOrder/:orderId", verifyToken, updateMyOrder);
router.put("/orders/:orderId", verifyToken, AdminAuth, updateOrder);

router.delete("/users/:userId", verifyToken, AdminAuth, deleteUser);
router.delete("/users", verifyToken, AdminAuth, deleteAllUsers);
router.delete("/orders/:orderId", verifyToken, AdminAuth, deleteOrder);
router.delete("/orders", verifyToken, AdminAuth, deleteAllOrders);
router.delete("/myorders/:orderId", verifyToken, deleteMyOrder);
router.delete("/products/:id", verifyToken, AdminAuth, deleteProduct);
router.delete("/products", verifyToken, AdminAuth, deleteAllProducts);

export default router;
