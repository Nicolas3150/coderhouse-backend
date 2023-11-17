import { Address } from "../models/address.model.js";
import CustomError from "../utils/CustomError.js";

export const createAddress = async (newAddress) => {
  try {
    return await Address.create(newAddress);
  } catch (error) {
    throw new CustomError(500, "Error creating new address");
  }
};
