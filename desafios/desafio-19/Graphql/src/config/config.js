import dotenv from "dotenv";
// import MongoStore from "connect-mongo";

dotenv.config();

// const session = {
//   store: MongoStore.create({
//     mongoUrl: process.env.MONGO_URL,
//     mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
//   }),
//   secret: process.env.KEY_SECRET,
//   rolling: true,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     httpOnly: false,
//     secure: false,
//     maxAge: parseInt(process.env.TIEMPO_EXPIRACION),
//   },
// };

export default {
  port: process.env.PORT || 3000,
  mongoURL: process.env.MONGO_URL,
  mode: process.env.MODE || "fork",
  // session,
};
