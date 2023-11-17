import * as orderService from "../services/order.service.js";

export const generateOrder = async (req, res) => {
  try {
    const { address } = req.body;
    const order = await orderService.generateOrder(req.uid, address);
    res.json(order);
  } catch (error) {
    res.json(error);
  }
};

export const getOrders = async (req, res) => {
  try {
    const response = await orderService.getAllOrders();
    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const response = await orderService.getUserOrders(req.uid);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
};
