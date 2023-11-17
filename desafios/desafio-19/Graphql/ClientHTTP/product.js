import axios from "axios";

const getAllProducts = async (arrayQueries) => {
  try {
    let values = "";
    arrayQueries.forEach((i) => {
      values += `${i}\n`;
    });
    const graphqlQuery = {
      operationName: "getAllProducts",
      query: `query getAllProducts{
        getAllProducts{
            ${values}
      }
    }`,
    };

    const options = {
      url: "http://localhost:3000/graphql/api/productos",
      method: "GET",
      data: graphqlQuery,
    };
    const response = await axios(options);
    return response.data.data.getAllProducts;
  } catch (err) {
    console.log(err);
  }
};

async function getOneProduct({ _id }, arrayQueries) {
  let values = "";
  arrayQueries.forEach((i) => {
    values += `${i}\n`;
  });
  const graphqlQuery = {
    operationName: "getOneProduct",
    query: `query getOneProduct{
        getOneProduct(_id:"${_id}"){
            ${values}
          }
        }`,
  };

  const options = {
    url: "http://localhost:3000/graphql/api/productos",
    method: "GET",
    data: graphqlQuery,
  };

  const response = await axios(options);
  return response.data.data.getOneProduct;
}

async function createProduct({ datos }) {
  const graphqlMutation = {
    operationName: "createProduct",
    query: `mutation createProduct{
        createProduct(datos:{token: "${datos.token}", title:"${datos.title}", description: "${datos.description}", code: "${datos.code}", price: ${datos.price}, thumbnail:"${datos.thumbnail}", stock: ${datos.stock}}){
          _id
          title
          description
          code
          price
          thumbnail
          stock
        }
      }`,
  };
  const options = {
    url: "http://localhost:3000/graphql/api/productos",
    method: "POST",
    data: graphqlMutation,
  };

  const response = await axios(options);
  return response.data.data.createProduct;
}

async function updateProduct({ datos }) {
  const graphqlMutation = {
    operationName: "updateProduct",
    query: `mutation updateProduct{
        updateProduct(_id:"${datos._id}", datos:{token: "${datos.token}", title:"${datos.title}", description: "${datos.description}", code: "${datos.code}", price: ${datos.price}, thumbnail:"${datos.thumbnail}", stock: ${datos.stock}}){
            _id
            title
            description
            code
            price
            thumbnail
            stock
          }
        }`,
  };
  const options = {
    url: "http://localhost:3000/graphql/api/productos",
    method: "POST",
    data: graphqlMutation,
  };

  const response = await axios(options);
  return response.data.data.updateProduct;
}

async function deleteProduct({ _id, token }) {
  const graphqlMutation = {
    operationName: "deleteProduct",
    query: `mutation deleteProduct{
        deleteProduct(_id:"${_id}" , token:"${token}"){
              _id
              title
            }
          }`,
  };
  const options = {
    url: "http://localhost:3000/graphql/api/productos",
    method: "POST",
    data: graphqlMutation,
  };

  const response = await axios(options);
  return response.data.data.deleteProduct;
}

export {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
