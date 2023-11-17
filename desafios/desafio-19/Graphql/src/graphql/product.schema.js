import { buildSchema } from "graphql";

const ProductSchema = buildSchema(`
    input ProductInput {
        token: String,
        title: String,
        description: String,
        code: String,
        price: Float,
        thumbnail: String,
        stock: Int,
    }

    type Product {
        _id: ID!,
        title: String,
        description: String,
        code: String,
        price: Float,
        thumbnail: String,
        stock: Int,
        timestamp: Float,
    }

    type Query {
        getAllProducts: [Product],
        getOneProduct(_id: ID!): Product,
    }

    type Mutation {
        createProduct(datos: ProductInput): Product,
        updateProduct(_id: ID!, datos: ProductInput): Product,
        deleteProduct(_id: ID!, token: String): Product,
    }
`);

export default ProductSchema;
