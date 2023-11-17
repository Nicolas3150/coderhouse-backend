import BaseRepository from "./BaseRepository.js";
import DaoFactory from "../daos/daoFactory.js";
import MessageDTO from "../dtos/message.dto.js";

const daoFactory = new DaoFactory();
const messageDao = daoFactory.createMessageDao();

class MessageRepository extends BaseRepository {
  constructor() {
    super(messageDao);
  }

  create = async (message) => {
    await messageDao.create(message);
  };

  getNormalizedMessage = async () => {
    const messageCollectionDB = await messageDao.getAll();
    const messageCollection = messageCollectionDB.map((message) => ({
      ...message._doc,
    }));
    const normalizedCollection = new MessageDTO(messageCollection);
    return normalizedCollection;
  };
}

export default MessageRepository;
