import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    stock: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const productModel = new model("Product", productSchema);

export const Product = productModel;
