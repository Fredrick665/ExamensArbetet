import Joi from "joi";
import { v4 as uuidv4 } from "uuid";

const uuidSchema = Joi.string().uuid();
export const userSchema = Joi.object({
  userId: uuidSchema.default(() => uuidv4()),
  username: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("user", "admin").default("user"),
});
