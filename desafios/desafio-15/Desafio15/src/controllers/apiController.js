import ProductContainer from "../containers/productContainer.js";
import { fork } from "child_process";
import logger from "../logger.js";

const apiMock = new ProductContainer();

const getProducts = async (req, res) => {
  try {
    apiMock.createProducts(5);
    const response = await apiMock.getAll();
    res.json(response).status(201);
  } catch (err) {
    logger.error(`Fallo la carga de productos`);
    res.status(500);
  }
};

const forkRandoms = (req, res) => {
  const forked = fork("src/fork/random.js");
  forked.on("message", (msg) => {
    msg == "listo"
      ? forked.send(req.query.cant ? req.query.cant.toString() : "")
      : res.send(msg);
  });
};

export { getProducts, forkRandoms };
