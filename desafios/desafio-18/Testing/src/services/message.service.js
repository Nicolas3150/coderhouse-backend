import BaseService from "./base.service.js";
import DaoFactory from "../daos/daoFactory.js";
import MessageDTO from "../dtos/message.dto.js";

const daoFactory = new DaoFactory();
const messageDao = daoFactory.createMessageDao();

class MessageService extends BaseService {
  constructor() {
    super(messageDao);
  }

  create = async (message) => {
    await messageDao.create(message);
  };

  getAll = async () => {
    const messageCollectionDB = await messageDao.getAll();
    const messageCollection = messageCollectionDB.map((message) => ({
      ...message._doc,
    }));
    const normalizedCollection = new MessageDTO(messageCollection);
    return normalizedCollection;
  };
}

export default MessageService;
