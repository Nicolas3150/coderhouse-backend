import UserService from "../services/user.service.js";
import logger from "../utils/loggers.js";

class UserController {
  constructor() {
    this.service = new UserService();
  }

  register = async (req, res) => {
    try {
      const token = await this.service.create(req.body);
      res.json({ token });
    } catch (err) {
      console.log(err);
      if (err.statusCode) {
        return res.status(err.statusCode).send(err);
      }
      res.status(500).json(err);
    }
  };

  login = async (req, res) => {
    try {
      const token = await this.service.login(req.body);
      res.json({ token });
    } catch (err) {
      console.log(err);
      if (err.statusCode) {
        return res.status(err.statusCode).send(err);
      }

      res.sendStatus(500);
    }
  };

  getUser = async (req, res) => {
    try {
      const user = await this.service.getById(req.params.id);
      res.json(user);
    } catch (err) {
      console.log(err);
      if (err.statusCode) {
        return res.status(err.statusCode).send(err);
      }

      res.sendStatus(500);
    }
  };
}

export default UserController;
