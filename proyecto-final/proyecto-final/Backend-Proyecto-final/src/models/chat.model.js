import { Schema, model } from "mongoose";

const chatSchema = new Schema(
  {
    messages: [
      {
        message: { type: Schema.Types.ObjectId, ref: "Message" },
        response: [{ type: Schema.Types.ObjectId, ref: "Message" }],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const chatModel = new model("Chat", chatSchema);

export const Chat = chatModel;
