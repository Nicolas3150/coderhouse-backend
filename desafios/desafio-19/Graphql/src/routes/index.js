import { Router } from "express";
import { graphqlHTTP } from "express-graphql";

import UserRoute from "./user.route.js";
import UserSchema from "../graphql/user.schema.js";

import ProductRoute from "./product.route.js";
import ProductSchema from "../graphql/product.schema.js";

import MessageRoute from "./message.route.js";
import MessageSchema from "../graphql/message.schema.js";

const router = Router();

const userRouter = new UserRoute();
const productRouter = new ProductRoute();
const messageRouter = new MessageRoute();
// const infoRoute = new InfoRoute();

router.use(
  "/api/productos",
  graphqlHTTP({
    schema: ProductSchema,
    rootValue: {
      ...productRouter.start(),
    },
    graphiql: true,
  })
);
router.use(
  "/api/mensajes",
  graphqlHTTP({
    schema: MessageSchema,
    rootValue: {
      ...messageRouter.start(),
    },
    graphiql: true,
  })
);
router.use(
  "/",
  graphqlHTTP({
    schema: UserSchema,
    rootValue: {
      ...userRouter.start(),
    },
    graphiql: true,
  })
);

export default router;
