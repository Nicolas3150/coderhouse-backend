const getLogout = (req, res) => {
  const usuario = req.user.username;
  req.session.destroy((err) => {
    if (err) {
      return res.json({ error: true, body: err });
    }
  });
  res.render("logout-ok", { usuario });
};

export { getLogout };
