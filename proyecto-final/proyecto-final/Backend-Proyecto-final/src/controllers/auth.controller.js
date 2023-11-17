import * as userService from "../services/user.service.js";
import { generateToken, generateRefreshToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
//path
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const register = async (req, res) => {
  try {
    const userCreated = await userService.createUser(req.body);

    const { token, expiresIn } = generateToken(userCreated._id.toString());
    generateRefreshToken(userCreated._id.toString(), res);

    return res.json({ token, expiresIn });
  } catch (error) {
    res.json({ error });
  }
};

export const login = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userService.getUserByEmail(email);

    const { token, expiresIn } = generateToken(user._id.toString());
    generateRefreshToken(user._id.toString(), res);

    return res.json({ token, expiresIn });
  } catch (error) {
    res.json(error);
  }
};

export const refreshToken = (req, res) => {
  try {
    let refreshTokenCookie = req.cookies?.refreshToken;
    if (!refreshTokenCookie)
      throw new CustomError(401, "No existe el refreshToken");

    const { _id } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);

    const { token, expiresIn } = generateToken(_id);
    return res.json({ token, expiresIn });
  } catch (error) {
    return res.status(401).json({ error: error });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("refreshToken");
    return res.json({ ok: true });
  } catch (error) {
    res.json({ error });
  }
};

export const loginRender = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "../../public/views/index.html"));
  } catch (error) {
    res.json({ error });
  }
};

export const getUserLogueado = async (req, res) => {
  try {
    const user = await userService.getUserById(req.uid);
    res.json(user);
  } catch (error) {
    res.json({ error });
  }
};
