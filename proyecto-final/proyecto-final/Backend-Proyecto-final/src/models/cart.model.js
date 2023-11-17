import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    products: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const cartModel = new model("Cart", cartSchema);

export const Cart = cartModel;
