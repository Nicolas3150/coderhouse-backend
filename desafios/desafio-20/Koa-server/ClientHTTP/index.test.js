import { login, register, getOneUser } from "./user.js";
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
  username: "Pepito",
  password: "12345678",
  ...user,
});
if (!token) token = await login({ username: "Pepito", password: "12345678" });
console.log("token: ", token);

// <-------------------------------------PRUEBA A USUARIO-------------------------------------------->

// console.log(await getOneUser(token, "63592ed97d135a6a88c8c250"));

// <-------------------------------------PRUEBA A PRODUCTOS-------------------------------------------->

// const product = productFactory.generateProduct();
// const p = await createProduct(token, product);
// console.log(p);
// const productToUpdate = productFactory.generateProduct();
// console.log(await updateProduct(token, p.data._id, productToUpdate));

// console.log(await getAllProducts(token));
// console.log(await getOneProduct(token, "63592fa77d135a6a88c8c264"));

// console.log(await deleteProduct(token, "63592fa77d135a6a88c8c264"));

// <-------------------------------------PRUEBA A MENSAJES-------------------------------------------->

// console.log(await getAllMessages(token));
// let author = await getOneUser(token, "635821c997e987e0381da20c");
// sendMessage(token, {
//   author: author,
//   text: "Esto es una prueba",
//   date: new Date(Date.now()).toDateString(),
// });
