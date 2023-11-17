import ProductContainer from "../containers/productContainer.js";
import { fork } from "child_process";

const apiMock = new ProductContainer();

const getProducts = async (req, res) => {
  try {
    apiMock.createProducts(5);
    const response = await apiMock.getAll();
    res.json(response).status(201);
  } catch (err) {
    res.json({ error: true, message: err });
  }
};

const forkRandoms = (req, res) => {
  const forked = fork("src/fork/random.js");
  console.log(`Process_pid: ${process.pid}`);
  forked.on("message", (msg) => {
    msg == "listo"
      ? forked.send(req.query.cant ? req.query.cant.toString() : "")
      : res.send(msg);
  });
};

export { getProducts, forkRandoms };
