import mongoose from "mongoose";
import CustomError from "../utils/CustomError.js";
import config from "../config/config.js";
import logger from "../utils/loggers.js";

export const connect = async () => {
  try {
    await mongoose.connect(config.mongoURL);
    logger.info("Database connected");
  } catch (err) {
    throw new CustomError(500, "Error connecting with database");
  }
};

export const disconnect = async () => {
  try {
    await mongoose.connection.close();
    logger.info("Database disconnected");
  } catch (err) {
    throw new CustomError(500, "Error disconnecting with database");
  }
};
