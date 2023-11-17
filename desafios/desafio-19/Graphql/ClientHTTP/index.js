import { login, register, getAllUsers, getOneUser } from "./user.js";
import {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./product.js";
import { getAllMessages, sendMessage } from "./message.js";
import userFactory from "./factory/user.factory.js";
import productFactory from "./factory/product.factory.js";

// <-------------------------------------INICIO DE SESION-------------------------------------------->
//No comentar "INICIO DE SESION" ya que para la prueba de Productos y Mensajes se requiere del token de inicio de sesion

let token = null;

const user = userFactory.generateUser();
token = await register({
  datos: {
    username: "Prueba",
    password: "12345678",
    ...user,
  },
});
if (!token) token = await login({ username: "Prueba", password: "12345678" });
console.log("token", token);

// <-------------------------------------PRUEBA A USUARIO-------------------------------------------->

// console.log(await getAllUsers(["username", "email", "avatar"]));
// console.log(
//   await getOneUser({ _id: "63507d1f3f2aa862f9dd0e65" }, [
//     "username",
//     "avatar",
//     "email",
//     "age",
//   ])
// );

// <-------------------------------------PRUEBA A PRODUCTOS-------------------------------------------->

// const product = productFactory.generateProduct();
// const p = await createProduct({ datos: { token: token, ...product } });
// console.log(p);
// const productToUpdate = productFactory.generateProduct();
// console.log(
//   await updateProduct({
//     datos: { _id: p._id, token: token, ...productToUpdate },
//   })
// );

// console.log(await getAllProducts(["title", "price", "stock"]));
// console.log(
//   await getOneProduct({ _id: "63507dfa464eef8f050e648b" }, [
//     "title",
//     "price",
//     "stock",
//   ])
// );

// console.log(
//   await deleteProduct({
//     token: token,
//     _id: p._id,
//   })
// );

// <-------------------------------------PRUEBA A MENSAJES-------------------------------------------->

// console.log(await getAllMessages(["author", "text", "date"]));
// let id_user = await getOneUser({ _id: "63507d1f3f2aa862f9dd0e65" }, ["_id"]);
// sendMessage({
//   datos: {
//     token: token,
//     author: id_user._id,
//     text: "Hola, esto es una prueba!",
//     date: new Date().toDateString(),
//   },
// });
// console.log(await getAllMessages(["author", "text", "date"]));
