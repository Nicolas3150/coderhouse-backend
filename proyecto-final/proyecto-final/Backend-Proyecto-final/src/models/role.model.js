import { Schema, model } from "mongoose";

export const ROLES = ["user", "admin"];

const roleSchema = new Schema(
  {
    name: { type: String },
  },
  {
    versionKey: false,
  }
);

const roleModel = model("Role", roleSchema);

export const Rol = roleModel;
