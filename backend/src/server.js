import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

const app = express();

app.get("/", (req, res) => res.send("hello from server"));

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () =>
      console.log(`server is up and running on PORT: ${ENV.PORT} `),
    );
  } catch (error) {
    console.error("failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
