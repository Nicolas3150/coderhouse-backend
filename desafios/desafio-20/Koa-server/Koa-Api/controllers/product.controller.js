import { Product } from "../models/product.model.js";

const getAll = async (ctx) => {
  const productCollection = await Product.find();
  ctx.response.status = 200;
  ctx.body = {
    status: "success",
    data: productCollection,
  };
};

const getById = async (ctx) => {
  const productId = ctx.params.id;
  try {
    const getCurrentProduct = await Product.findById({ _id: productId });
    if (!getCurrentProduct) {
      throw new Error();
    } else {
      ctx.body = {
        status: "success",
        data: getCurrentProduct,
      };
    }
  } catch (err) {
    ctx.response.status = 404;
    ctx.body = {
      status: "Not found",
      message: `Product with Id ${productId} not found`,
    };
  }
};

const createOne = async (ctx) => {
  const { title, description, code, price, thumbnail, stock } =
    ctx.request.body;

  if (!title || !description || !code || !price || !thumbnail || !stock) {
    ctx.response.status = 400;
    ctx.body = {
      status: "Missing data",
      message: "Please enter the data",
    };
  } else {
    const productCreated = await Product.create({
      title,
      description,
      code,
      price,
      thumbnail,
      stock,
      timestamp: Date.now().toString(),
    });

    ctx.response.status = 201;
    ctx.body = {
      status: "created",
      data: productCreated,
    };
  }
};

const updateOne = async (ctx) => {
  const productId = ctx.params.id;
  try {
    const getCurrentProduct = await Product.findById({ _id: productId });
    if (!getCurrentProduct) {
      throw new Error();
    } else {
      const { title, description, code, price, thumbnail, stock } =
        ctx.request.body;

      if (!title || !description || !code || !price || !thumbnail || !stock) {
        ctx.response.status = 400;
        ctx.body = {
          status: "Missing data",
          message: "Please enter the data",
        };
      } else {
        await Product.updateOne(
          { _id: productId },
          { $set: { title, description, code, price, thumbnail, stock } }
        );
        ctx.response.status = 201;
        ctx.body = {
          status: "updated",
          message: `Product with id ${productId} updated!`,
        };
      }
    }
  } catch (err) {
    ctx.response.status = 404;
    ctx.body = {
      status: "Not found",
      message: `Product with Id ${productId} not found`,
    };
  }
};

const deleteOne = async (ctx) => {
  const productId = ctx.params.id;
  try {
    const response = await Product.deleteOne({ _id: productId });
    if (response.deletedCount === 0) {
      throw new Error();
    } else {
      ctx.response.status = 200;
      ctx.body = {
        status: "Deleted",
        message: `Product with id ${productId} deleted!`,
      };
    }
  } catch (err) {
    ctx.response.status = 404;
    ctx.body = {
      status: "Not found",
      message: `Product with Id ${productId} not found`,
    };
  }
};

export default {
  getAll,
  getById,
  createOne,
  updateOne,
  deleteOne,
};
