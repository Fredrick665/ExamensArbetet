import db from "../db/db.js";
import { v4 as uuidv4 } from "uuid";

const products = [
  {
    productId: uuidv4(),
    name: "Klassiska Ögonfransförlängningar",
    cost: 500,
    time: "90 minuter",
    description: "Ett naturligt utseende med individuella fransar.",
  },
  {
    productId: uuidv4(),
    name: "Volymögonfransförlängningar",
    cost: 800,
    time: "120 minuter",
    description: "Ett fylligare och mer dramatiskt utseende.",
  },
  {
    productId: uuidv4(),
    name: "Hybridögonfransförlängningar",
    cost: 700,
    time: "105 minuter",
    description: "En blandning av klassiska och volymfransar.",
  },
  {
    productId: uuidv4(),
    name: "Franslyft",
    cost: 400,
    time: "60 minuter",
    description: "En semi-permanent behandling.",
  },
  {
    productId: uuidv4(),
    name: "Ögonfransfärgning",
    cost: 200,
    time: "30 minuter",
    description: "En snabb behandling som mörkar dina naturliga fransar.",
  },
  {
    productId: uuidv4(),
    name: "Fransborttagning",
    cost: 150,
    time: "20 minuter",
    description: "Säker borttagning av ögonfransförlängningar.",
  },
];

async function createInitialData() {
  try {
    console.log("Connecting to database...");

    const ProductCollection = db.collection("products");
    const UserCollection = db.collection("users");
    const OrderCollection = db.collection("orders");

    console.log("Database connection established.");

    const superAdmin = {
      userId: uuidv4(),
      username: "SuperAdmin",
      password: "SuperAdmin",
      role: "admin",
    };

    const existingAdmin = await UserCollection.findOne({
      username: "SuperAdmin",
    });
    if (!existingAdmin) {
      console.log("Inserting SuperAdmin user...");
      const adminResult = await UserCollection.insertOne(superAdmin);
      console.log(`SuperAdmin inserted: ${adminResult.insertedId}`);
    } else {
      console.log("SuperAdmin user already exists.");
    }

    console.log("Inserting products...");
    for (const product of products) {
      console.log(
        `Checking if product exists: ${product.name} (ID: ${product.productId})`
      );
      const existingProduct = await ProductCollection.findOne({
        name: product.name,
      });
      if (!existingProduct) {
        console.log(
          `Adding product: ${product.name} (ID: ${product.productId})`
        );
        const productResult = await ProductCollection.insertOne(product);
        console.log(`Product inserted with ID: ${productResult.insertedId}`);
      } else {
        console.log(`Product already exists: ${product.name}`);
      }
    }
    console.log("All products checked and added successfully.");

    console.log("Generating mock orders...");
    for (let i = 0; i < 3 + Math.floor(Math.random() * 2); i++) {
      const order = {
        orderId: uuidv4(),
        items: [
          products[Math.floor(Math.random() * products.length)],
          products[Math.floor(Math.random() * products.length)],
        ],
      };

      console.log(`Inserting Order ${i + 1} with ID: ${order.orderId}`);
      const orderResult = await OrderCollection.insertOne(order);
      console.log(`Order ${i + 1} inserted with ID: ${orderResult.insertedId}`);
    }

    console.log("Mock orders added successfully.");
  } catch (error) {
    console.error("Error inserting mock data:", error);
  } finally {
    console.log("Script execution completed.");
    process.exit();
  }
}
createInitialData();
