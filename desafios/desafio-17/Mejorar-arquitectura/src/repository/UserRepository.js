import BaseRepository from "./BaseRepository.js";
import DaoFactory from "../daos/daoFactory.js";

const daoFactory = new DaoFactory();
const userDao = daoFactory.createUserDao();

class UserRepository extends BaseRepository {
  constructor() {
    super(userDao);
  }

  create = async (newUser) => {
    return await userDao.create(newUser);
  };

  getById = (id, done) => {
    return userDao.getById(id, done);
  };

  getByUsername = async (username) => {
    return await userDao.getByUsername(username);
  };
}

export default UserRepository;
