import { ObjectId } from "mongodb";
import { handleError } from "../utils/ErrorHandler.js";
import validateRequest from "../Validators/ValidateRequest.js";
import { orderSchema } from "../models/Schemas.js";
import db from "../db/db.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await db.collection("orders").find().toArray();
    const sanitizedOrders = orders.map(({ _id, ...order }) => order);
    res.status(200).json(sanitizedOrders);
  } catch (error) {
    handleError(res, error, "Error fetching orders.");
  }
};

export const getUserOrder = async (req, res) => {
  try {
    const { username } = req.params;
    const orders = await db.collection("orders").find({ username }).toArray();

    if (!orders.length) {
      return res
        .status(404)
        .json({ message: "No orders found for this user." });
    }
    const sanitizedOrders = orders.map(({ _id, ...order }) => order);
    res.status(200).json(sanitizedOrders);
  } catch (error) {
    handleError(res, error, "Error fetching user orders.");
  }
};

export const createOrder = [
  validateRequest(orderSchema),
  async (req, res) => {
    try {
      const { orderId, items } = req.validatedBody;
      const total = items.reduce(
        (acc, item) => acc + item.cost * item.quantity,
        0
      );
      const username = req.user?.username;
      if (!username) {
        return res
          .status(401)
          .json({ message: "You must be logged in to create an order." });
      }
      const order = { _id: orderId, orderId, items, total, username };
      await db.collection("orders").insertOne(order);
      const { _id, ...insertedOrder } = await db
        .collection("orders")
        .findOne({ _id: orderId });
      res.status(201).json(insertedOrder);
    } catch (error) {
      handleError(res, error, "Error creating order.");
    }
  },
];

export const updateOrder = [
  validateRequest(orderSchema),
  async (req, res) => {
    try {
      const { orderId } = req.params;
      const { items } = req.validatedBody;
      const total = items.reduce(
        (acc, item) => acc + item.cost * item.quantity,
        0
      );

      if (req.user?.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized." });
      }

      const existingOrder = await db
        .collection("orders")
        .findOne({ _id: orderId });

      if (!existingOrder) {
        return res.status(404).json({ message: "Order not found." });
      }

      const updateResult = await db
        .collection("orders")
        .updateOne({ _id: orderId }, { $set: { items, total } });

      if (!updateResult.modifiedCount) {
        return res.status(400).json({ message: "No changes made." });
      }

      const { _id, ...updatedOrder } = await db
        .collection("orders")
        .findOne({ _id: orderId });

      res.status(200).json(updatedOrder);
    } catch (error) {
      handleError(res, error, "Error updating order.");
    }
  },
];

export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await db.collection("orders").findOne({ _id: orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }
    await db.collection("orders").deleteOne({ _id: orderId });
    res.status(200).json({ message: "Order deleted successfully." });
  } catch (error) {
    handleError(res, error, "Error deleting order.");
  }
};

export const deleteAllOrders = async (req, res) => {
  try {
    await db.collection("orders").deleteMany({});
    res.status(200).json({ message: "All orders deleted successfully." });
  } catch (error) {
    handleError(res, error, "Error deleting all orders.");
  }
};
