import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import path from "path";
import { fileURLToPath } from "url";
import MessageContainer from "./public/js/messageContainer.js";
import router from "./routes/routes.js";
import sessions from './routes/sessions.js'
import { Server } from "socket.io";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(express.static(path.join(__dirname, "./public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://nico:nico123@cluster0.uridlts.mongodb.net/desafio10?retryWrites=true&w=majority",
      mongoOptions,
    }),
    secret: "coderhouse",
    resave: false,
    saveUninitialized: false,
    rolling: true, // Reinicia el tiempo de expiracion con cada request
    cookie: {
      maxAge: 600000,
    },
  })
);

app.use('/', sessions)
app.use('/api', router)

app.use((req, res) => {
  res.status(400).json({ error: -2, descripcion: "Ruta no implementada" });
});

const expressServer = app.listen(8080, (err) => {
  err
    ? console.log(`Se produjo un error al iniciar el servidor ${err}`)
    : console.log(`El servidor esta escuchando el puerto ${8080}`);
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
