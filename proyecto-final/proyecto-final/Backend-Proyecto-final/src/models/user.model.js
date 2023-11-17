import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatar: { type: String, required: true },
    birthday: { type: Date, required: true },
    phone: { type: String, required: true },
    address: { type: Schema.Types.ObjectId, ref: "Address" },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    cart: { type: Schema.Types.ObjectId, ref: "Cart" },
  },
  {
    versionKey: false,
  }
);

const userModel = model("User", UserSchema);

export const User = userModel;
