import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateToken = (_id) => {
  const expiresIn = 1000 * 60 * 15;
  const token = jwt.sign({ _id: _id }, config.jwt_secret, {
    expiresIn,
  });
  return { token, expiresIn };
};

export const generateRefreshToken = (_id, res) => {
  const expiresIn = 1000 * 60 * 60 * 24 * 30;
  const refreshToken = jwt.sign({ _id: _id }, config.jwt_refresh, {
    expiresIn,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: !(process.env.MODO === "developer"),
    expires: new Date(Date.now() + expiresIn),
  });
};
