import MessageService from "../services/message.service.js";

class MessageController {
  constructor() {
    this.service = new MessageService();
  }

  create = async (req, res) => {
    try {
      const response = await this.service.create(req.body);
      res.status(201).json(response);
    } catch (err) {
      console.log(err);
    }
  };

  getAll = async (req, res) => {
    try {
      const response = await this.service.getAll();
      res.json(response);
    } catch (err) {
      console.log(err);
    }
  };
}

export default MessageController;
