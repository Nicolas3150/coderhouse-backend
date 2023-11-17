import axios from "./axios.js";
import userFactory from "./factory/user.factory.js";

let token;

/*Conectamos un usuario de prueba para poder realizar las diferentes 
peticiones al servidor */
const login = async () => {
  try {
    const response = await axios.post("/login", {
      username: "Prueba",
      password: "12345678",
    });
    token = response.data.token;
  } catch (err) {
    console.log(err);
  }
};

const register = async () => {
  try {
    const user = userFactory.generateUser();
    const response = await axios.post("/register", {
      username: "Prueba",
      password: "12345678",
      ...user,
    });
    if (response.data.token) token = response.data.token;
  } catch (err) {
    if (err.response.data.message == "User already exists!") await login();
  }
};

const getAllProducts = async () => {
  try {
    const response = await axios.get("/api/productos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const getOneProduct = async (id) => {
  try {
    const response = await axios.get(`/api/productos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const addProduct = async (newProduct) => {
  try {
    const response = await axios.post(
      "/api/productos",
      { ...newProduct },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const putProduct = async (id, product) => {
  try {
    const response = await axios.put(
      `/api/productos/${id}`,
      { ...product },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`/api/productos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

//function para dividir los logs
const divLogs = (str) => {
  console.log(`${"*".repeat(50)}   ${str}   ${"*".repeat(50)}`);
};

async function main() {
  await register();

  divLogs(`Todos los productos: `);
  console.log(await getAllProducts());

  divLogs("Add product");
  const addedProd = await addProduct({
    title: "Lapiz",
    description: "Lapiz negro 7b",
    code: "001AAB",
    price: 740,
    thumbnail:
      "https://cdn2.iconfinder.com/data/icons/flat-pack-1/64/Pencil-256.png",
    stock: 3,
  });
  console.log(addedProd);

  divLogs(`Producto de id: ${addedProd._id}`);
  console.log(await getOneProduct(addedProd._id));

  divLogs(`Todos los productos: `);
  console.log(await getAllProducts());

  divLogs(`Modifica producto de id: ${addedProd._id}`);
  console.log(
    await putProduct(addedProd._id, {
      title: "Regla",
      description: "Regla de 30 cm",
      code: "001AAA",
      price: 135.5,
      thumbnail:
        "https://cdn4.iconfinder.com/data/icons/unigrid-tools/54/023_rule_direct_ruler_scale_measure_tool-64.png",
      stock: 25,
    })
  );

  divLogs(`Producto de id: ${addedProd._id}`);
  console.log(await getOneProduct(addedProd._id));

  divLogs(`Todos los productos: `);
  console.log(await getAllProducts());

  divLogs(`Delete product de id: ${addedProd._id}`);
  console.log(await deleteProduct(addedProd._id));

  divLogs(`Todos los productos: `);
  console.log(await getAllProducts());
}

main();
