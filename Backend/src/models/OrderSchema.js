import { v4 as uuidv4 } from "uuid";
import Joi from "joi";
import { cartItemSchema } from "../models/CartItemSchema.js";

const uuidSchema = Joi.string().uuid();
export const orderSchema = Joi.object({
  orderId: uuidSchema.default(() => uuidv4()),
  items: Joi.array().items(cartItemSchema).min(1).required(),
});
