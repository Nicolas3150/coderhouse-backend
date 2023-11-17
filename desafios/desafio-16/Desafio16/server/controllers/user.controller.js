const getUser = (req, res) => {
  res.json({ ...req.session.passport, admin: process.env.ADMIN });
};

export const userController = {
  getUser,
};
