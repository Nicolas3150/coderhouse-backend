import dotenv from "dotenv";
import yargs from "yargs";

dotenv.config();

const yarg = yargs(process.argv.slice(2));
const arg = yarg
  .alias({
    p: "port",
    m: "mode",
  })
  .default({
    port: 8080,
    mode: "fork",
  }).argv;

export default {
  ARG: arg,
  MONGO_URL: process.env.MONGO_URL,
  KEY_SECRET: process.env.KEY_SECRET,
  TIEMPO_EXPIRACION: parseInt(process.env.TIEMPO_EXPIRACION),
  HOST: process.env.HOST,
};
