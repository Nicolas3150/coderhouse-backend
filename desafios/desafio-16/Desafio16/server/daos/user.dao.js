import { User } from "../models/user.model.js";

const getByUsername = async (username) => {
  const user = await User.findOne({ username });
  return user;
};

const createUser = async (user) => {
  const newUser = await User.create(user);
  return newUser;
};

const getById = async (id) => {
  const user = User.findById(id);
  return user;
};

export const userDao = {
  getByUsername,
  createUser,
  getById,
};
