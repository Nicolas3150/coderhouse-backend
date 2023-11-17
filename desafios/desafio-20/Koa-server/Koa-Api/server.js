import Koa from "koa";
import koaBody from "koa-body";
import cors from "@koa/cors";
import productRoute from "./routes/product.route.js";
import MessageRoute from "./routes/message.route.js";
import UserRoute from "./routes/user.route.js";
import { connect } from "./database/mongo.client.js";

const app = new Koa();

app.use(koaBody());
app.use(cors());

app.use(productRoute.routes());
app.use(MessageRoute.routes());
app.use(UserRoute.routes());

app.use((ctx) => {
  ctx.response.status = 404;
  ctx.body = "Not found";
});

await connect();
app.listen(3000);
console.log("Server listening http://localhost:3000");
