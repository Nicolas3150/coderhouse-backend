import { Chat } from "../models/chat.model.js";
import CustomError from "../utils/CustomError.js";

export const getChat = async () => {
  try {
    return (await Chat.find())[0].populate([
      "messages.message",
      "messages.response",
    ]);
  } catch (error) {
    throw new CustomError(500, `Error getting chat`);
  }
};

export const updateChat = async (id, messages) => {
  try {
    return await Chat.updateOne({ _id: id }, { $set: { messages: messages } });
  } catch (error) {
    throw new CustomError(500, `Error updating chat`);
  }
};
