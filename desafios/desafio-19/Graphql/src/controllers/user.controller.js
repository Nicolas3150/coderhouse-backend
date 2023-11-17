import UserService from "../services/user.service.js";
import jwt from "../utils/jwt.js";
import logger from "../utils/loggers.js";

class UserController {
  constructor() {
    this.service = new UserService();
  }

  register = async ({ datos }) => {
    try {
      const userToCreate = await this.service.create(datos);
      const authToken = jwt.generateToken(userToCreate);
      return {
        user: { ...userToCreate },
        token: authToken,
      };
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  login = async ({ username, password }) => {
    try {
      const user = await this.service.login(username, password);
      const authToken = jwt.generateToken(user);
      return {
        user: { ...user },
        token: authToken,
      };
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  getUser = async ({ _id }) => {
    try {
      const user = await this.service.getById(_id);
      return user;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  getUsers = async () => {
    try {
      return await this.service.getAll();
    } catch (err) {
      console.log(err);
      return err;
    }
  };
}

export default UserController;
