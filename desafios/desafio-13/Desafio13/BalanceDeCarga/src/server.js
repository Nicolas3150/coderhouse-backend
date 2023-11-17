import express from "express";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import path from "path";
import router from "./routes/api.js";
import session from "express-session";
import { engine } from "express-handlebars";
import passport from "passport";
import MongoStore from "connect-mongo";
import register from "./routes/register.js";
import login from "./routes/login.js";
import logout from "./routes/logout.js";
import home from "./routes/home.js";
import MessageContainer from "./containers/messageContainer.js";
import config from "./config.js";
import info from "./routes/info.js";
import os from "os";
import cluster from "cluster";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const cpus = os.cpus();

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: path.join(__dirname, "../public/views/layouts/main.hbs"),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../public/views"));

if (config.ARG.mode == "cluster" && cluster.isPrimary) {
  cpus.map(() => {
    cluster.fork();
  });

  cluster.on("exit", (worker) => {
    `Worker ${worker.process.pid} died!`;
    cluster.fork();
  });
} else {
  app.use(express.static(path.join(__dirname, "../public")));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: config.MONGO_URL,
        mongoOptions,
      }),
      secret: config.KEY_SECRET,
      rolling: true,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: false,
        secure: false,
        maxAge: config.TIEMPO_EXPIRACION,
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/", home);
  app.use("/login", login);
  app.use("/register", register);
  app.use("/api", router);
  app.use("/logout", logout);
  app.use("/info", info);

  app.get("*", (req, res) => {
    res.status(404).render("routing-error", {});
  });

  const expressServer = app.listen(config.ARG.port, (err) => {
    err
      ? console.log(`Se produjo un error al iniciar el servidor ${err}`)
      : console.log(
          `El servidor esta escuchando el puerto ${config.ARG.port} - pid: ${process.pid}`
        );
  });

  const io = new Server(expressServer);

  io.on("connection", async (socket) => {
    socket.emit("server:products");

    const messageDB = new MessageContainer();
    let messages = await messageDB.getMessages();
    socket.emit("server:message", messages);
    socket.on("client:message", async (message) => {
      await messageDB.saveMessage(message);
      messages = await messageDB.getMessages();
      io.emit("server:message", messages);
    });
  });
}
