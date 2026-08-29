import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 4000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongo: {
    uri: process.env.URL || "mongodb://localhost:27017/graphql_events",
    options: {},
  },
};
