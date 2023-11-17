import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    products: [],
    date: { type: Date, required: true },
    number: { type: Number, required: true },
    state: { type: String, required: true },
    address: { type: Map, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const orderModel = new model("Order", orderSchema);

export const Order = orderModel;
