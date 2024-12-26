import "dotenv/config"; // Carga variables locales del .env

import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const connectDb = (): Promise<typeof mongoose> => {
  const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_PORT,
    MONGO_DB,
    MONGO_HOSTNAME,
  } = process.env;

  const MONGO_URI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

  return mongoose.connect(MONGO_URI);
};

const disconnectDb = () => {
  return mongoose.connection.close();
};

export { connectDb, disconnectDb };
