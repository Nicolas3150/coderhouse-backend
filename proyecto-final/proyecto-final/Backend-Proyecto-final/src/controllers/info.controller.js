import config from "../config/config.js";

const getInfo = (req, res) => {
  try {
    const info = {
      argumentos: Object.entries(config),
      SO: process.platform,
      v_node: process.version,
      rss: process.memoryUsage().rss,
      path: process.title,
      process_id: process.pid,
      carpeta_raiz: process.cwd(),
    };
    res.render("info", { info });
  } catch (error) {
    res.json(error);
  }
};

export { getInfo };
