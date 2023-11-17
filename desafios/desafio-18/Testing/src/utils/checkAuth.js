let admin = true;

export const checkIfAdmin = (req, res, next) => {
  admin
    ? next()
    : res.status(401).json({ error: -1, descripcion: "Ruta no autorizada" });
};
