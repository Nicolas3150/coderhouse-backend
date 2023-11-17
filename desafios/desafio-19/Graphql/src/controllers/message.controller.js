import MessageService from "../services/message.service.js";
import jwt from "../utils/jwt.js";

class MessageController {
  constructor() {
    this.service = new MessageService();
  }

  sendMessage = async ({ datos }) => {
    try {
      if (jwt.authMiddleware(datos.token))
        return { error: "Error of validations" };
      const message = await this.service.create(datos);
      return message;
    } catch (err) {
      console.log(err);
    }
  };

  getAll = async () => {
    try {
      const messages = await this.service.getAll();
      return messages;
    } catch (err) {
      console.log(err);
    }
  };
}

export default MessageController;
