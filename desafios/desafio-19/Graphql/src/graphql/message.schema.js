import { buildSchema } from "graphql";

const MessageSchema = buildSchema(`
    input MessageInput {
        token: String,
        author: String,
        text: String,
        date: String,
    }

    type Message {
        _id: ID!,
        author: String,
        text: String,
        date: String,
    }

    type Query {
        getAll: [Message],
    }

    type Mutation {
        sendMessage(datos: MessageInput): Message,
    }
`);

export default MessageSchema;
