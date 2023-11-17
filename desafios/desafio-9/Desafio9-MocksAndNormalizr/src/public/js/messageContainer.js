import mongoose from "mongoose";
import messageModel from './models/message.js'
import { normalize, schema, denormalize } from "normalizr";

await mongoose.connect("mongodb+srv://nico:nico123@cluster0.uridlts.mongodb.net/desafio9?retryWrites=true&w=majority")

class MessageContainer {
    constructor() {
        this.collection = messageModel
    }

    async saveMessage(message) {
        try {
            let msj = new (this.collection)(message)
            msj.save()
            console.log('item inserted!')
        } catch (e) {
            console.log(e);
        }
    }

    async getMessages() {
        try {
            const messageCollectionDB = await this.collection.find({}, { _id: 1, __v: 0 })
            const messageCollection = messageCollectionDB.map(message => ({ ...message._doc }))
            const normalizedCollection = this.normalizeMessage(messageCollection)
            return normalizedCollection
        } catch (err) {
            console.log(err);
        }
    }

    normalizeMessage(messageCollection) {
        const author = new schema.Entity("authors")
        const mensaje = new schema.Entity("mensaje", {
            author: author
        }, { idAttribute: "_id" })
        const mensajes = new schema.Entity("mensajes", {
            mensajes: [mensaje]
        })
        const dataMessages = { id: "mensajes", mensajes: messageCollection }

        const normalizedData = normalize(dataMessages, mensajes);
        return normalizedData
    }
}

export default MessageContainer