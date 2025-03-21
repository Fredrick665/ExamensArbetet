import jwt from "jsonwebtoken";
import { handleError } from "../utils/ErrorHandler.js";
import { loginSchema } from "../models/Schemas.js";
import validateRequest from "../Validators/ValidateRequest.js";
import db from "../db/db.js";
export const loginUser = [
  validateRequest(loginSchema),
  async (req, res) => {
    try {
      const { username, password } = req.validatedBody;
      const user = await db.collection("users").findOne({ username });

      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid login credentials" });
      }

      const token = jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
        },
      });
    } catch (error) {
      handleError(res, error, "Login failed");
    }
  },
];
