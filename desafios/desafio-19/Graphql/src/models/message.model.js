import { Schema, model } from "mongoose";

const MessageSchema = new Schema({
  author: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: String, required: true },
});

const messageModel = model("message", MessageSchema);

export const Message = messageModel;
