import BaseService from "./base.service.js";
import DaoFactory from "../daos/daoFactory.js";
import { hashPassword, isValidPassword } from "../utils/hashPassword.js";
import UserDTO from "../dtos/user.dto.js";
import jwt from "../utils/jwt.js";
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
      throw new CustomError(false, "User already exists!", true, 400);
    }
    const userToAdd = {
      ...newUser,
      password: hashPassword(newUser.password),
    };
    const authToken = jwt.generateToken(await userDao.create(userToAdd));
    return authToken;
  };

  login = async ({ username, password }) => {
    const user = await userDao.getByUsername(username);
    if (!user || !isValidPassword(password, user.password)) {
      throw new CustomError(false, "Invalid Credentials!", true, 400);
    }
    const authToken = jwt.generateToken(user);
    return authToken;
  };

  //   getById = async (id) => {
  //     return await userDao.getById(id);
  //   };
}

export default UserService;
