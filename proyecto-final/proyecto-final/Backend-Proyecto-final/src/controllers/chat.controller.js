import * as chatService from "../services/chat.service.js";
import * as userService from "../services/user.service.js";
//path
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getChat = async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "../../public/views/chat.html"));
  } catch (error) {
    res.json(error);
  }
};

export const getMessagesByEmail = async (req, res) => {
  try {
    const user = await userService.getUserById(req.uid);
    const arrayMessages = await chatService.getMessagesForUser(user.email);
    res.json(arrayMessages);
  } catch (error) {
    res.json(error);
  }
};

export const sendMessage = async (req, res) => {
  try {
    const user = await userService.getUserById(req.uid);
    const response = await chatService.addMessage({
      ...req.body,
      author: user._id,
      date: new Date(Date.now()),
    });
    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

export const sendResponse = async (req, res) => {
  const { id_message } = req.params;
  const user = await userService.getUserById(req.uid);
  const response = await chatService.addResponse(id_message, {
    ...req.body,
    author: user._id,
    date: new Date(Date.now()),
  });
  res.json(response);
  try {
  } catch (error) {
    res.json(error);
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id_message } = req.params;
    const chat = await chatService.deleteMessage(id_message);
    res.json(chat);
  } catch (error) {
    res.json(error);
  }
};

export const deleteResponse = async (req, res) => {
  try {
    const { id_message, id_response } = req.params;
    const chat = await chatService.deleteResponse(id_message, id_response);
    res.json(chat);
  } catch (error) {
    res.json(error);
  }
};
