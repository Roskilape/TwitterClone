import express from "express";
import { ENV } from "./config/env.js";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { connectDB } from "./config/db.js";
import userRoute from "./routes/user.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("hello from server"));

app.use("/api/users", userRoute);

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
