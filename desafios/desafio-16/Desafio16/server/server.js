import express from "express";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import { engine } from "express-handlebars";
import { fileURLToPath } from "url";
import path from "path";
import os from "os";
import cluster from "cluster";
import routes from "./routes/index.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cpus = os.cpus();

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: path.join(__dirname, "../client/views/layouts/main"),
    layoutsDir: path.join(__dirname, "../client/views"),
    partialsDir: path.join(__dirname, "../client/views/partials"),
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../client/views"));

app.use(express.static(path.join(__dirname, "../client")));

await mongoose.connect(process.env.MONGO_DB);

if (process.env.MODE == "cluster" && cluster.isPrimary) {
  cpus.map(() => {
    cluster.fork();
  });

  cluster.on("exit", (worker) => {
    logger.info(`Worker ${worker.process.pid} died!`);
    cluster.fork();
  });
} else {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_DB,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      }),
      secret: "coderhouse",
      rolling: true,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: false,
        secure: false,
        maxAge: parseInt(process.env.TIEMPO_EXPIRACION) || 600000,
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/", routes);

  app.get("*", (req, res) => {
    const { url, method } = req;
    console.log(`Ruta ${method} ${url} no implementada`);
    res.status(404).render("routing-error", {});
  });

  app.listen(port, (err) => {
    err
      ? console.log(`Se produjo un error al iniciar el servidor ${err}`)
      : console.log(`El servidor esta escuchando el puerto ${port}`);
  });
}
