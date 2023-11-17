import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  timestamp: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  avatar: { type: String, required: true },
  address: { type: Map, required: true },
  birthday: { type: String, required: true },
  id_cart: { type: String, required: true },
});

const userModel = mongoose.model("usuario", userSchema);

export const User = userModel;
