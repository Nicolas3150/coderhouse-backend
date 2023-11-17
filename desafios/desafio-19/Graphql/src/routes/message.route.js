import MessageController from "../controllers/message.controller.js";

class MessageRoute {
  constructor() {
    this.controller = new MessageController();
  }

  start() {
    return {
      getAll: this.controller.getAll,
      sendMessage: this.controller.sendMessage,
    };
  }
}

export default MessageRoute;
