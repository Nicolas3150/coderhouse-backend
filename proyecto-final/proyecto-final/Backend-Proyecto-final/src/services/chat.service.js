import * as messageDao from "../daos/message.dao.js";
import * as chatDao from "../daos/chat.dao.js";
import * as userDao from "../daos/user.dao.js";

export const getChat = async () => {
  const response = await chatDao.getChat();
  const chat = await response.populate([
    "messages.message.author",
    "messages.response.author",
  ]);
  return chat;
};

export const getMessagesForUser = async (email) => {
  const user = await userDao.getUserByEmail(email);
  return await messageDao.getMessagesById(user._id);
};

export const addMessage = async (message) => {
  const chat = await chatDao.getChat();
  const messageCreated = await messageDao.createMessage(message);
  chat.messages.push({
    message: messageCreated._id,
    response: [],
  });
  await chatDao.updateChat(chat._id, chat.messages);
  return chat;
};

export const addResponse = async (id_message, message) => {
  const chat = await chatDao.getChat();
  const messageCreated = await messageDao.createMessage(message);
  const messageToModify = await chat.messages.find(
    (item) => item.message._id.toString() === id_message
  );
  messageToModify.response.push(messageCreated);
  await chatDao.updateChat(chat._id, chat.messages);
  return chat;
};

export const deleteMessage = async (id_message) => {
  //Borrar tanto mensajes principales como sus respuestas
  const chat = await chatDao.getChat();
  const messages = await chat.messages.filter((item) => {
    return item.message._id.toString() !== id_message;
  });
  for (let i = 0; i < messages.length; i++) {
    await messageDao.deleteMessage(messages[i]._id);
  }
  await messageDao.deleteMessage(id_message);
  chat.messages = messages;
  await chatDao.updateChat(chat._id, chat.messages);
  return chat;
};

export const deleteResponse = async (id_message, id_response) => {
  const chat = await chatDao.getChat();
  const message = await chat.messages.find(
    (item) => item.message._id.toString() === id_message
  );
  message.response = await message.response.filter(
    (item) => item._id.toString() !== id_response
  );
  await chatDao.updateChat(chat._id, chat.messages);
  await messageDao.deleteMessage(id_response);
  return chat;
};
