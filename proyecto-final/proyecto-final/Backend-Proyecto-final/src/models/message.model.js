import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    message: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const messageModel = new model("Message", messageSchema);

export const Message = messageModel;
