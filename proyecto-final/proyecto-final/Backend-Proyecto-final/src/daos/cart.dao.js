import { Cart } from "../models/cart.model.js";
import CustomError from "../utils/CustomError.js";

export const createCart = async () => {
  try {
    return await Cart.create({});
  } catch (error) {
    throw new CustomError(500, "Error creating cart");
  }
};

export const getCartById = async (id) => {
  try {
    return await Cart.findById({ _id: id });
  } catch (error) {
    throw new CustomError(500, `Cart by id: ${id} not found`);
  }
};

export const getProductsInCart = async (id) => {
  try {
    return await Cart.findById({ _id: id }).populate("products._id");
  } catch (error) {
    throw new CustomError(500, `Cart by id: ${id} not found`);
  }
};

export const updateCart = async (id, arrayProd) => {
  try {
    return await Cart.updateOne({ _id: id }, { $set: { products: arrayProd } });
  } catch (error) {
    throw new CustomError(500, `Error add product to cart`);
  }
};

export const deleteCart = async (id) => {
  try {
    return await Cart.deleteOne({ _id: id });
  } catch (error) {
    throw new CustomError(500, "Error delete cart");
  }
};
