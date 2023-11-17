import config from "../config.js";

const getInfo = (req, res) => {
  const info = {
    argumentos: Object.entries(config.ARG),
    SO: process.platform,
    v_node: process.version,
    rss: process.memoryUsage().rss,
    path: process.title,
    process_id: process.pid,
    carpeta_raiz: process.cwd(),
  };

  res.render("info", { info });
};

export { getInfo };
