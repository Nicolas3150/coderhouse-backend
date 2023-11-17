import express from "express";
import compression from "compression";
import cors from "cors";

import config from "./config/config.js";
import routes from "./routes/index.js";
import StoreFactory from "./store/factory.client.js";
import logger from "./utils/loggers.js";

const storeFactory = new StoreFactory();
const database = storeFactory.createDatabaseClient();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "POST, GET, DELETE, PUT",
  })
);

app.use(compression());

app.use("/", routes);

app.get("*", (req, res) => {
  const { url, method } = req;
  logger.warn(`Ruta ${method} ${url} no implementada`);
  res.status(404);
});

database.connect().then(() => {
  app.listen(config.port, (err) => {
    err
      ? logger.error(`Se produjo un error al iniciar el servidor ${err}`)
      : logger.info(
          `El servidor esta escuchando el puerto ${config.port} - pid: ${process.pid}`
        );
  });
});
