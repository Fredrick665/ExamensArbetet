import Joi from "joi";
import { v4 as uuidv4 } from "uuid";

const uuidSchema = Joi.string().uuid();

export const cartItemSchema = Joi.object({
  itemId: uuidSchema.default(() => uuidv4()),
  name: Joi.string().required(),
  cost: Joi.number().required(),
  quantity: Joi.number().integer().min(1).required(),
});
