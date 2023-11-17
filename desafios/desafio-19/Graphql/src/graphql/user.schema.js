import { buildSchema } from "graphql";

const UserSchema = buildSchema(`
    input UserInput {
        username: String,
        password: String,
        email: String,
        firstName: String,
        lastName: String,
        avatar: String,
        age: Int,
    }

    type User {
        _id: ID!,
        username: String,
        password: String,
        email: String,
        firstName: String,
        lastName: String,
        avatar: String,
        age: Int,
    }

    type AuthPayload {
        user: User,
        token: String,
    }

    type Query {
        getUser(_id: ID!): User,
        getUsers: [User]
        login(username: String, password: String): AuthPayload,
    }

    type Mutation {
        register(datos: UserInput): AuthPayload,
    }
`);

export default UserSchema;
