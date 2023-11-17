import { Message } from "../models/message.model.js";

const create = async (ctx) => {
  const { author, text, date } = ctx.request.body;

  if (!author || !text || !date) {
    ctx.response.status = 400;
    ctx.body = {
      status: "Missing data",
      message: "Please enter the data",
    };
  } else {
    const messageCreated = await Message.create({
      author,
      text,
      date,
    });

    ctx.response.status = 201;
    ctx.body = {
      status: "created",
      data: messageCreated,
    };
  }
};

const getAll = async (ctx) => {
  const messageCollection = await Message.find();
  ctx.response.status = 200;
  ctx.body = {
    status: "success",
    data: messageCollection,
  };
};

export default {
  create,
  getAll,
};
