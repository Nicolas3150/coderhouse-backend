import DBClient from "./db.client.js";
import mongoose from "mongoose";
import CustomError from "../utils/CustomError.js";
import config from "../config/config.js";
import logger from "../utils/loggers.js";

let instance;

class MongoClient extends DBClient {
  constructor() {
    super();
    this.connected = false;
  }

  connect = async () => {
    try {
      await mongoose.connect(config.mongoURL);

      this.connected = true;

      logger.info("Database connected");
    } catch (err) {
      logger.error(err);
      throw new CustomError(500, "Error connecting with database");
    }
  };

  disconnect = async () => {
    try {
      await mongoose.connection.close();

      this.connected = false;

      logger.info("Database disconnected");
    } catch (err) {
      logger.error(err);
      throw new CustomError(500, "Error disconnecting with database");
    }
  };

  static getInstance() {
    if (!instance) {
      instance = new MongoClient();
    }

    return instance;
  }
}

export default MongoClient;
