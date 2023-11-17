import UserDao from "./user.dao.js";
import ProductDao from "./product.dao.js";
import MessageDao from "./message.dao.js";

class DaoFactory {
  createUserDao() {
    return UserDao.getInstance();
  }
  createProductDao() {
    return ProductDao.getInstance();
  }
  createMessageDao() {
    return MessageDao.getInstance();
  }
}

export default DaoFactory;
