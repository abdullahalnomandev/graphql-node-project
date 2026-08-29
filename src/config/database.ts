import mongoose from "mongoose";
import { config } from "../config";

export const connectDB = async (): Promise<typeof mongoose> => {
  try {
    const conn = await mongoose.connect(config.mongo.uri, config.mongo.options);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

export const disconnectDB = async (): Promise<void> => {
  await mongoose.disconnect();
  console.log("🔌 MongoDB disconnected");
};

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️  MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
  console.log("🔄 MongoDB reconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB error:", err);
});
