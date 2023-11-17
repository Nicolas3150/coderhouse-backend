import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { engine } from "express-handlebars";
import { Server } from "socket.io";

import config from "./src/config/config.js";
import { connect } from "./src/database/mongo.client.js";
import { initialSetup } from "./src/utils/initialSetup.js";
import routes from "./src/routes/index.route.js";
import * as chatService from "./src/services/chat.service.js";
import logger from "./src/utils/loggers.js";

//path
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: path.join(__dirname, "./public/views/layouts/main.hbs"),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./public/views"));

app.use(express.static(path.join(__dirname, "./public")));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "POST, GET, DELETE, PUT",
  })
);

app.use("/api", routes);

app.get("*", (req, res) => {
  res.status(404).render("routing-error", {});
  // res.status(404).json({ message: "Page not found" });
});

await connect();
await initialSetup();
const expressServer = app.listen(config.port, (err) => {
  err
    ? logger.error(err)
    : logger.info(
        `El servidor esta escuchando el puerto ${config.port} - pid: ${process.pid}`
      );
});
const io = new Server(expressServer);
io.on("connection", async (socket) => {
  socket.emit("server", await chatService.getChat());
  socket.on("client", async () => {
    io.emit("server", await chatService.getChat());
  });
});
