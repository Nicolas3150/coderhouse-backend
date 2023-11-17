import BaseService from "./base.service.js";
import DaoFactory from "../daos/daoFactory.js";

const daoFactory = new DaoFactory();
const messageDao = daoFactory.createMessageDao();

class MessageService extends BaseService {
  constructor() {
    super(messageDao);
  }

  create = async (message) => {
    await messageDao.create(message);
  };
}

export default MessageService;
