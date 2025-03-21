import express from "express";
import cors from "cors";
import routes from "./src/router/routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use("/api", routes);

export default app;
