import MessageDao from "./message.dao.js";
import ProductDao from "./product.dao.js";
import UserDao from "./user.dao.js";

class DaoFactory {
  createProductDao() {
    return ProductDao.getInstance();
  }
  createMessageDao() {
    return MessageDao.getInstance();
  }
  createUserDao() {
    return UserDao.getInstance();
  }
}

export default DaoFactory;
