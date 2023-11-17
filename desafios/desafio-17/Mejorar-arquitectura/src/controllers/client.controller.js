import { fork } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getHome = (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/views/home.html"));
};

const forkRandoms = (req, res) => {
  const forked = fork("src/utils/random.js");
  forked.on("message", (msg) => {
    msg == "listo"
      ? forked.send(req.query.cant ? req.query.cant.toString() : "")
      : res.send(msg);
  });
};

const getUser = (req, res) => {
  res.json(req.user);
};

export const clientController = {
  getHome,
  forkRandoms,
  getUser,
};
