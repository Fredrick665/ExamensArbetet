import Joi from "joi";
import { v4 as uuidv4 } from "uuid";

const uuidSchema = Joi.string().uuid();
export const productSchema = Joi.object({
  productId: uuidSchema.default(() => uuidv4()),
  name: Joi.string().required(),
  description: Joi.string().required(),
  time: Joi.string().required(),
  cost: Joi.number().positive().required(),
});
