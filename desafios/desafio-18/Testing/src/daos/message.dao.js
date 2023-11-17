import { Message } from "../models/message.model.js";
import CustomError from "../utils/CustomError.js";
import DAO from "./DAO.js";

let instance = null;

class MessageDao extends DAO {
  constructor() {
    super();
    this.collection = Message;
  }

  create = async (message) => {
    try {
      const createdMessage = await this.collection.create(message);
      return createdMessage;
    } catch (error) {
      throw new CustomError(500, "Error save message");
    }
  };

  getAll = async () => {
    try {
      const messageCollection = await this.collection.find(
        {},
        { _id: 1, __v: 0 }
      );
      return messageCollection;
    } catch (error) {
      throw new CustomError(500, "Error getting messages");
    }
  };

  static getInstance() {
    if (!instance) {
      instance = new MessageDao();
    }
    return instance;
  }
}

export default MessageDao;
