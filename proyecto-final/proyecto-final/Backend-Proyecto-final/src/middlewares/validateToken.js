import jwt from "jsonwebtoken";
import { Rol } from "../models/role.model.js";
import { User } from "../models/user.model.js";
import CustomError from "../utils/CustomError.js";

export const validateToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;
    if (!token) throw new CustomError(403, "No token provided");

    token = token.split(" ")[1];
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = _id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export const ifAdmin = async (req, res, next) => {
  const user = await User.findById(req.uid);
  const roles = await Rol.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") return next();
  }

  return res.status(403).json({ message: "Required admin rol" });
};
