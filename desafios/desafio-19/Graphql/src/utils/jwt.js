import jwt from "jsonwebtoken";
import CustomError from "./CustomError.js";

const privateKey = "coderhouse";

const authMiddleware = (token) => {
  if (!token) {
    throw new CustomError(401, "You dont hace permission to visit this page");
  }

  jwt.verify(token, privateKey, (err) => {
    if (err) {
      throw new CustomError(401, "You dont hace permission to visit this page");
    }
    return;
  });
  return;
};

const generateToken = (user) => {
  const payload = {
    data: {
      username: user.username,
      email: user.email,
    },
  };
  return jwt.sign(payload, privateKey, { expiresIn: "30m" });
};

export default { generateToken, authMiddleware };
