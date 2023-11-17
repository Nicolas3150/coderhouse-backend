import express from "express";
import session from "express-session";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import MongoStore from "connect-mongo";
import passport from "passport";
import compression from "compression";

import config from "./config/config.js";
import routes from "./routes/index.js";
import StoreFactory from "./store/factory.client.js";
import MessageRepository from "./repository/MessageRepository.js";
import logger from "./utils/loggers.js";
//path
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storeFactory = new StoreFactory();
const database = storeFactory.createDatabaseClient();
const app = express();

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: path.join(__dirname, "../public/views/layouts/main.hbs"),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../public/views"));

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongoURL,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret: config.secret,
    rolling: true,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: config.time,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(compression());

app.use("/", routes);

app.get("*", (req, res) => {
  const { url, method } = req;
  logger.warn(`Ruta ${method} ${url} no implementada`);
  res.status(404).render("routing-error", {});
});

await database.connect();
const expressServer = app.listen(config.port, (err) => {
  err
    ? logger.error(`Se produjo un error al iniciar el servidor ${err}`)
    : logger.info(
        `El servidor esta escuchando el puerto ${config.port} - pid: ${process.pid}`
      );
});

const io = new Server(expressServer);

io.on("connection", async (socket) => {
  socket.emit("server:products");
  socket.on("client:products", async () => {
    io.emit("server:products");
  });

  const messageRepository = new MessageRepository();
  let messages = (await messageRepository.getNormalizedMessage())
    .normalizedCollection;
  socket.emit("server:message", messages);
  socket.on("client:message", async (message) => {
    await messageRepository.create(message);
    messages = (await messageRepository.getNormalizedMessage())
      .normalizedCollection;
    io.emit("server:message", messages);
  });
});
