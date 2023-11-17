import { Message } from "../models/message.model.js";
import CustomError from "../utils/CustomError.js";

export const createMessage = async (message) => {
  try {
    return await Message.create(message);
  } catch (error) {
    throw new CustomError(500, "Error creating message");
  }
};

export const deleteMessage = async (id) => {
  try {
    return await Message.deleteOne({ _id: id });
  } catch (error) {
    throw new CustomError(500, "Error deleting message");
  }
};

export const getMessagesById = async (id) => {
  try {
    return await Message.find({ author: id });
  } catch (error) {
    throw new CustomError(500, "Error getting messages by email");
  }
};
