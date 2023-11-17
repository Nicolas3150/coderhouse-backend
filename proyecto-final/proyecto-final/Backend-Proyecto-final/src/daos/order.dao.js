import { Order } from "../models/order.model.js";
import CustomError from "../utils/CustomError.js";

export const createOrder = async (order) => {
  try {
    return await Order.create(order);
  } catch (error) {
    throw new CustomError(500, "Error creating order");
  }
};

export const getNumberOrders = async () => {
  try {
    return await Order.count();
  } catch (error) {
    throw new CustomError(500, "Error getting number orders");
  }
};

export const getAllOrders = async () => {
  try {
    return await Order.find().populate("user");
  } catch (error) {
    throw new CustomError(500, "Error getting orders");
  }
};

export const getUserOrders = async (id) => {
  try {
    return await Order.find({ user: id });
  } catch (error) {
    throw new CustomError(500, "Error getting orders for user");
  }
};
