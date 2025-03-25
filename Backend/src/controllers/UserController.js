import db from "../db/db.js";
import ValidateRequest from "../Validators/ValidateRequest.js";
import { userSchema } from "../models/UserSchema.js";
import { handleError } from "../utils/ErrorHandler.js";

export const validateUser = ValidateRequest(userSchema);
export const getAllUsers = async (req, res) => {
  try {
    const users = await db.collection("users").find().toArray();
    const usersWithoutId = users.map(
      ({ _id, ...userWithoutId }) => userWithoutId
    );
    return res.status(200).json(usersWithoutId);
  } catch (error) {
    return handleError(res, error, "Error fetching users.");
  }
};

export const createUser = async (req, res) => {
  const { username, password, role } = req.validatedBody;

  try {
    const newUser = { ...req.validatedBody, _id: req.validatedBody.userId };

    const existingUser = await db
      .collection("users")
      .findOne({ _id: newUser.userId });
    if (existingUser) {
      return res.status(400).json({ message: "UserId already exists." });
    }

    await db.collection("users").insertOne(newUser);

    const insertedUser = await db
      .collection("users")
      .findOne({ _id: newUser.userId });
    const { _id, ...userWithoutId } = insertedUser;

    return res.status(201).json(userWithoutId);
  } catch (error) {
    return handleError(res, error, "Error creating user.");
  }
};

export const updateRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.validatedBody;

  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const validUserId = String(userId);
    const user = await db.collection("users").findOne({ userId: validUserId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (role === "user" && user.role === "admin") {
      const adminCount = await db
        .collection("users")
        .countDocuments({ role: "admin" });
      if (adminCount <= 1) {
        return res
          .status(400)
          .json({ message: "There must always be at least one admin." });
      }
    }

    await db
      .collection("users")
      .updateOne({ userId: validUserId }, { $set: { role } });
    const updatedUser = await db
      .collection("users")
      .findOne({ userId: validUserId });
    const { _id, ...userWithoutId } = updatedUser;

    return res.status(200).json({
      message: `User role changed to ${role}`,
      user: userWithoutId,
    });
  } catch (error) {
    return handleError(res, error, "Error updating user role.");
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const validUserId = String(userId);
    const user = await db.collection("users").findOne({ userId: validUserId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await db.collection("users").deleteOne({ userId: validUserId });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return handleError(res, error, "Error deleting user.");
  }
};

export const deleteAllUsers = async (req, res) => {
  try {
    await db.collection("users").deleteMany({});
    return res.status(200).json({ message: "All users deleted successfully" });
  } catch (error) {
    return handleError(res, error, "Error deleting all users.");
  }
};
