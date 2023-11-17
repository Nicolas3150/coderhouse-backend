import { User } from "../models/user.model.js";
import { hashPassword, isValidPassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/generateToken.js";

const register = async (ctx) => {
  const { username, password, email, firstName, lastName, avatar, age } =
    ctx.request.body;
  if (
    !username ||
    !password ||
    !email ||
    !firstName ||
    !lastName ||
    !avatar ||
    !age
  ) {
    ctx.response.status = 400;
    ctx.body = {
      status: "Missing data",
      message: "Please enter the data",
    };
  } else {
    const user = await User.findOne({ username });
    if (user) {
      ctx.response.status = 401;
      ctx.body = {
        status: "data not valid",
        message: "User Already exists!",
      };
    } else {
      const userToAdd = await User.create({
        username,
        password: hashPassword(password),
        email,
        firstName,
        lastName,
        avatar,
        age,
      });
      const token = generateToken(userToAdd);
      ctx.response.status = 201;
      ctx.body = {
        status: "created",
        data: token,
      };
    }
  }
};

const login = async (ctx) => {
  const { username, password } = ctx.request.body;
  if (!username || !password) {
    ctx.response.status = 400;
    ctx.body = {
      status: "Missing data",
      message: "Please enter the data",
    };
  } else {
    const user = await User.findOne({ username: username });
    if (!user || !isValidPassword(password, user.password)) {
      ctx.response.status = 400;
      ctx.body = {
        status: "data not valid",
        message: "Invalid credentials!",
      };
    } else {
      const token = generateToken(user);
      ctx.response.status = 200;
      ctx.body = {
        status: "Success",
        data: token,
      };
    }
  }
};

const getUser = async (ctx) => {
  const userId = ctx.params.id;
  try {
    const user = await User.findById({ _id: userId });
    ctx.response.status = 200;
    ctx.body = {
      status: "success",
      data: { ...user._doc },
    };
  } catch (err) {
    console.log(err);
    ctx.response.status = 404;
    ctx.body = {
      status: "Not found",
      message: `User with Id ${userId} not found`,
    };
  }
};

export default {
  register,
  login,
  getUser,
};
