import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import router from "./routes/api.js";
import { engine } from "express-handlebars";
import config from "./config.js";
import os from "os";
import cluster from "cluster";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
  app.use("/api", router);

  app.listen(config.ARG.port, (err) => {
    err
      ? console.log(`Se produjo un error al iniciar el servidor ${err}`)
      : console.log(`El servidor esta escuchando el puerto ${config.ARG.port}`);
  });
}
