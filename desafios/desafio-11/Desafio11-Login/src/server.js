import express from "express";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import path from "path";
import router from "./routes/products.js";
import session from "express-session";
import { engine } from "express-handlebars";
import passport from "passport";
import MongoStore from "connect-mongo";
import register from "./routes/register.js";
import login from "./routes/login.js";
import logout from "./routes/logout.js";
import home from "./routes/home.js";
import MessageContainer from "./containers/messageContainer.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

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
      mongoUrl:
        "mongodb+srv://nico:nico123@cluster0.uridlts.mongodb.net/desafio11?retryWrites=true&w=majority",
      mongoOptions,
    }),
    secret: "coderhouse",
    rolling: true,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: parseInt(process.env.TIEMPO_EXPIRACION),
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

app.get("*", (req, res) => {
  res.status(404).render("routing-error", {});
});

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
