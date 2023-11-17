import dotenv from "dotenv";

dotenv.config();

export default {
  port: Number(process.env.PORT) || 3000,
  mongoURL: process.env.MONGO_URL,
  jwt_secret: process.env.JWT_SECRET,
  jwt_refresh: process.env.JWT_REFRESH,
  token_expiresIn: Number(process.env.TOKEN_EXPIRES),
  refresh_token_expiresIn: Number(process.env.REFRESH_TOKEN_EXPIRES),
  admin_email: process.env.ADMIN_EMAIL,
  password: process.env.PASSWORD,
};
