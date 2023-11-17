import BaseService from "./base.service.js";
import DaoFactory from "../daos/daoFactory.js";
import { hashPassword, isValidPassword } from "../utils/hashPassword.js";
import CustomError from "../utils/CustomError.js";

const daoFactory = new DaoFactory();
const userDao = daoFactory.createUserDao();

class UserService extends BaseService {
  constructor() {
    super(userDao);
  }

  create = async (newUser) => {
    const user = await userDao.getByUsername(newUser.username);
    if (user) {
      throw new CustomError(400, "User already exists!");
    }
    const userToAdd = {
      ...newUser,
      password: hashPassword(newUser.password),
    };
    const userCreated = await userDao.create(userToAdd);
    return userCreated;
  };

  login = async (username, password) => {
    const user = await userDao.getByUsername(username);
    if (!user || !isValidPassword(password, user.password)) {
      throw new CustomError(400, "Invalid Credentials!");
    }
    return user;
  };
}

export default UserService;
