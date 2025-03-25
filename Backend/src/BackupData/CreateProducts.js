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
    console.log("Ansluter till databasen");

    const ProductCollection = db.collection("products");
    const UserCollection = db.collection("users");
    const OrderCollection = db.collection("orders");

    console.log("Databasen är kopplad!.");

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
      console.log("SuperAdmin försöker läggas in i databasen");
      const adminResult = await UserCollection.insertOne(superAdmin);
      console.log(
        `SuperAdmin är tillagd i databasen!: ${adminResult.insertedId}`
      );
    } else {
      console.log("SuperAdmin finns redan.");
    }

    console.log("Lägger till produkter...");
    for (const product of products) {
      console.log(
        `Kollar om produkten existerar: ${product.name} (ID: ${product.productId})`
      );
      const existingProduct = await ProductCollection.findOne({
        name: product.name,
      });
      if (!existingProduct) {
        console.log(
          `Lägger till produkten: ${product.name} (ID: ${product.productId})`
        );
        const productResult = await ProductCollection.insertOne(product);
        console.log(
          `Produkten har fått följande id: ${productResult.insertedId}`
        );
      } else {
        console.log(`Produkten finns redan: ${product.name}`);
      }
    }
    console.log("Alla produkter tillagda!");

    console.log("Skapar mockordrar...");
    for (let i = 0; i < 3 + Math.floor(Math.random() * 2); i++) {
      const id = uuidv4();
      const orderItems = [
        {
          ...products[Math.floor(Math.random() * products.length)],
          quantity: 1,
        },
        {
          ...products[Math.floor(Math.random() * products.length)],
          quantity: 1,
        },
      ];
      const total = orderItems.reduce(
        (acc, item) => acc + item.cost * item.quantity,
        0
      );

      const order = {
        _id: id,
        orderId: id,
        items: orderItems,
        total: total,
      };
      console.log(`Lägger till ${i + 1} med ID: ${order.orderId}`);
      const orderResult = await OrderCollection.insertOne(order);
      console.log(
        `Order ${i + 1} tillagd i databasen: ${orderResult.insertedId}`
      );
    }
    console.log("Mock ordrar tillagda!");
  } catch (error) {
    console.error("Error! Yay!:", error);
  } finally {
    console.log("Allt funkar!");
    process.exit();
  }
}
createInitialData();
