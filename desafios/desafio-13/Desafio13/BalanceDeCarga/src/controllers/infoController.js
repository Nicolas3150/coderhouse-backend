import config from "../config.js";
import os from "os";

const getInfo = (req, res) => {
  const info = {
    argumentos: Object.entries(config.ARG),
    SO: process.platform,
    v_node: process.version,
    rss: process.memoryUsage().rss,
    path: process.title,
    process_id: process.pid,
    carpeta_raiz: process.cwd(),
    cant_procesadores: os.cpus().length,
  };

  res.render("info", { info });
};

export { getInfo };
