import mongoose from "mongoose";
import dns from "node:dns";
import { ENV } from "./env.js";

dns.setServers(["1.1.1.1", "1.0.0.1"]);

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("connected to DB successfully ✅");
  } catch (error) {
    console.log("error connecting to MONGODB");
    process.exit(1);
  }
};
