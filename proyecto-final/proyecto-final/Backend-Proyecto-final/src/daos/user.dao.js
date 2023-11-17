import { User } from "../models/user.model.js";
import CustomError from "../utils/CustomError.js";

export const createUser = async (userToCreate) => {
  try {
    return await User.create(userToCreate);
  } catch (error) {
    throw new CustomError(500, "Error creating user");
  }
};

export const getUserById = async (id) => {
  try {
    return await User.findById({ _id: id });
  } catch (error) {
    throw new CustomError(500, `User by id: ${id} not found`);
  }
};

export const getUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw new CustomError(500, `User by email: ${email} not found`);
  }
};

export const getUserByUsername = async (username) => {
  try {
    return await User.findOne({ username });
  } catch (error) {
    throw new CustomError(500, `User by username: ${username} not found`);
  }
};

export const updateUser = async (id, newUser) => {
  try {
    return await User.updateOne({ _id: id }, { $set: { ...newUser } });
  } catch (error) {
    throw new CustomError(500, `Error updating user`);
  }
};

export const deleteOneUser = async (id) => {
  try {
    return await User.deleteOne({ _id: id });
  } catch (error) {
    throw new CustomError(500, `Error delete user`);
  }
};
