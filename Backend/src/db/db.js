import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

await client.connect();
console.log("Connected to MongoDB");

const db = client.db("Test");
export default db;
