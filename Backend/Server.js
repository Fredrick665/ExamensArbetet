import dotenv from "dotenv";
dotenv.config();

import app from "./App.js";

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
