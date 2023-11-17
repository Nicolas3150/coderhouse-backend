import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 3000,
  mongoURL: process.env.MONGO_URL,
  mode: process.env.MODE || "fork",
  secret: process.env.KEY_SECRET,
  time: parseInt(process.env.TIEMPO_EXPIRACION),
};
