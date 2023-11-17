import { User } from "../models/user.model.js";
import CustomError from "../utils/CustomError.js";
import DAO from "./DAO.js";

let instance = null;

class UserDao extends DAO {
  constructor() {
    super();
    this.collection = User;
  }

  create = async (user) => {
    try {
      const createdUser = await this.collection.create(user);
      return createdUser;
    } catch (error) {
      throw new CustomError(500, "Error creating user");
    }
  };

  getByUsername = async (username) => {
    try {
      const user = await this.collection.findOne({ username });
      return user;
    } catch (error) {
      throw new CustomError(500, "Error getting user by username");
    }
  };

  getById = (id) => {
    try {
      return this.collection.findById(id);
    } catch (error) {
      throw new CustomError(500, "Error getting by id");
    }
  };

  static getInstance() {
    if (!instance) {
      instance = new UserDao();
    }
    return instance;
  }
}

export default UserDao;
