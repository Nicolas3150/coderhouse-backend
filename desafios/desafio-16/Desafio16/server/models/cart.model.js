import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  timestamp: { type: String, required: true },
  products: { type: Array, required: true },
});

const cartModel = mongoose.model("carrito", cartSchema);

export const Cart = cartModel;
