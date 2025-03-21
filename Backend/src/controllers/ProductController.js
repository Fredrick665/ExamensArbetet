import db from "../db/db.js";
import validateRequest from "../Validators/ValidateRequest.js";
import { validateSchema } from "../Validators/ValidateSchema.js";
import { productSchema } from "../models/Schemas.js";
import { handleError } from "../utils/ErrorHandler.js";

export const getProducts = async (req, res) => {
  try {
    console.log("Fetching all products...");
    const products = await db
      .collection("products")
      .find({}, { projection: { _id: 0 } })
      .toArray();

    console.log("Products retrieved:", products);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    handleError(res, error, "Error fetching products.");
  }
};

export const createProduct = [
  validateRequest(productSchema),
  async (req, res) => {
    try {
      const product = req.validatedBody;
      await db.collection("products").insertOne(product);
      const insertedProduct = await db
        .collection("products")
        .findOne({ productId: product.productId });

      if (!insertedProduct) {
        console.error("Error: Product not found after creation.");
        return res
          .status(404)
          .json({ message: "Product not found after creation." });
      }
      const { _id, ...productWithoutId } = insertedProduct;
      res.status(201).json(productWithoutId);
    } catch (error) {
      console.error("Error creating product:", error);
      handleError(res, error, "Error creating product.");
    }
  },
];

export const updateProduct = [
  validateSchema(productSchema),
  async (req, res) => {
    try {
      const validProductId = req.params.id;
      const updateData = { ...req.validatedBody };
      delete updateData.productId;
      const existingProduct = await db
        .collection("products")
        .findOne({ productId: validProductId });
      if (!existingProduct) {
        return res.status(404).json({ message: "Product not found." });
      }
      if (updateData.name) {
        const duplicateProduct = await db
          .collection("products")
          .findOne({ name: updateData.name });

        if (duplicateProduct && duplicateProduct.productId !== validProductId) {
          return res.status(400).json({ message: "Duplicate product name." });
        }
      }
      const updateResult = await db
        .collection("products")
        .updateOne({ productId: validProductId }, { $set: updateData });

      if (updateResult.modifiedCount === 0) {
        return res
          .status(400)
          .json({ message: "No changes were made to the product." });
      }

      const updatedProduct = await db
        .collection("products")
        .findOne({ productId: validProductId });

      if (!updatedProduct) {
        return res
          .status(404)
          .json({ message: "Product not found after update." });
      }

      const { _id, ...productWithoutId } = updatedProduct;
      res.status(200).json(productWithoutId);
    } catch (error) {
      handleError(res, error, "Error updating product.");
    }
  },
];

export const deleteProduct = async (req, res) => {
  try {
    console.log("Received delete request for product ID:", req.params.id);

    const validProductId = req.params.id;
    console.log("Validated Product ID:", validProductId);

    const productFromDB = await db
      .collection("products")
      .findOne({ productId: validProductId });

    if (!productFromDB) {
      console.error(
        `Product not found in DB with productId: ${validProductId}`
      );
      return res.status(404).json({ message: "Product not found." });
    }

    console.log("Found product in DB before delete:", productFromDB);
    console.log("Delete query:", { productId: validProductId });

    const deletedProduct = await db
      .collection("products")
      .findOneAndDelete({ productId: validProductId });

    console.log("Delete operation result:", deletedProduct);
    if (!deletedProduct) {
      console.error("Error: Product not found after deletion attempt.");
      return res
        .status(404)
        .json({ message: "Product not found after deletion attempt." });
    }

    console.log("Deleted product:", deletedProduct);
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error("Error deleting product:", error);
    handleError(res, error, "Error deleting product.");
  }
};

export const deleteAllProducts = async (req, res) => {
  try {
    console.log("Deleting all products...");
    await db.collection("products").deleteMany({});
    console.log("All products deleted.");
    res.status(200).json({ message: "All products deleted successfully." });
  } catch (error) {
    console.error("Error deleting all products:", error);
    handleError(res, error, "Error deleting all products.");
  }
};
