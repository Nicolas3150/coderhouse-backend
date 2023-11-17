import messageModel from "../models/message.js";
import { normalize, schema } from "normalizr";

class MessageContainer {
  constructor() {
    this.collection = messageModel;
  }

  async saveMessage(message) {
    try {
      let msj = new this.collection(message);
      msj.save();
      console.log("item inserted!");
    } catch (e) {
      logger.error(`Fallo al intentar guardar el mensaje en la DataBase`);
      res.status(500);
    }
  }

  async getMessages() {
    try {
      const messageCollectionDB = await this.collection.find(
        {},
        { _id: 1, __v: 0 }
      );
      const messageCollection = messageCollectionDB.map((message) => ({
        ...message._doc,
      }));
      const normalizedCollection = this.normalizeMessage(messageCollection);
      return normalizedCollection;
    } catch (err) {
      logger.error(`Fallo la carga de mensajes`);
      res.status(500);
    }
  }

  normalizeMessage(messageCollection) {
    const author = new schema.Entity("authors");
    const mensaje = new schema.Entity(
      "mensaje",
      {
        author: author,
      },
      { idAttribute: "_id" }
    );
    const mensajes = new schema.Entity("mensajes", {
      mensajes: [mensaje],
    });
    const dataMessages = { id: "mensajes", mensajes: messageCollection };

    const normalizedData = normalize(dataMessages, mensajes);
    return normalizedData;
  }
}

export default MessageContainer;
