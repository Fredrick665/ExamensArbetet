import Joi from "joi";
import { v4 as uuidv4 } from "uuid";

const uuidSchema = Joi.string().uuid();

export const cartItemSchema = Joi.object({
  itemId: uuidSchema.default(() => uuidv4()),
  name: Joi.string().required(),
  cost: Joi.number().required(),
  quantity: Joi.number().integer().min(1).required(),
});

export const userSchema = Joi.object({
  userId: uuidSchema.default(() => uuidv4()),
  username: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("user", "admin").default("user"),
});

export const productSchema = Joi.object({
  productId: uuidSchema.default(() => uuidv4()),
  name: Joi.string().required(),
  description: Joi.string().required(),
  time: Joi.string().required(),
  cost: Joi.number().positive().required(),
});

export const orderSchema = Joi.object({
  orderId: uuidSchema.default(() => uuidv4()),
  items: Joi.array().items(cartItemSchema).min(1).required(),
});

export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const updateRoleSchema = Joi.object({
  role: Joi.string().valid("user", "admin").required(),
});
