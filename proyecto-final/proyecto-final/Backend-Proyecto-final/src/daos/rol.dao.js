import { Rol } from "../models/role.model.js";
import CustomError from "../utils/CustomError.js";

export const addRole = async (roles) => {
  try {
    if (roles) {
      const foundRoles = await Rol.find({ name: { $in: roles } });
      return foundRoles.map((rol) => rol._id);
    } else {
      const rol = await Rol.findOne({ name: "user" });
      return [rol._id];
    }
  } catch (error) {
    throw new CustomError(500, "Error getting rol");
  }
};
