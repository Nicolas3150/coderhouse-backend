import jwt from "jsonwebtoken";

const privateKey = "coderhouse";

export const generateToken = (user) => {
  const payload = {
    data: {
      username: user.username,
      email: user.email,
    },
  };
  return jwt.sign(payload, privateKey, { expiresIn: "30m" });
};
