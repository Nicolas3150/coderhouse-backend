import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String },
  },
  {
    versionKey: false,
  }
);

const categoryModel = model("Category", categorySchema);

export const Category = categoryModel;
