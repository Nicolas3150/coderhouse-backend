import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getHome = (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/views/home.html"));
};

const getUser = (req, res) => {
  res.json(req.user);
};

export { getHome, getUser };
