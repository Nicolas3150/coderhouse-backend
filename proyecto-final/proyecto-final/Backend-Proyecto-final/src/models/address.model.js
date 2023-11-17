import { Schema, model } from "mongoose";

const addressSchema = new Schema(
  {
    country: { type: String, required: true },
    province: { type: String, required: true },
    city: { type: String, required: true },
    cp: { type: Number, required: true },
    street: { type: String, required: true },
    number: { type: Number, required: true },
    floor: { type: Number },
    department: { type: String },
  },
  {
    versionKey: false,
  }
);

const addressModel = new model("Address", addressSchema);

export const Address = addressModel;
