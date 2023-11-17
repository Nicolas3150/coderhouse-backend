import { normalize, schema } from "normalizr";

class MessageDTO {
  constructor(messageCollection) {
    this.normalizedCollection = this.normalizeMessage(messageCollection);
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

export default MessageDTO;
