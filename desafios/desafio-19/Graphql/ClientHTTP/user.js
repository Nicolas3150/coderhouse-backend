import axios from "axios";

async function login({ username, password }) {
  const graphqlQuery = {
    operationName: "login",
    query: `query login{
        login(username: "${username}", password: "${password}") {
          token
        }
      }`,
  };

  const options = {
    url: "http://localhost:3000/graphql",
    method: "POST",
    data: graphqlQuery,
  };

  const response = await axios(options);
  return response.data.data.login.token;
}

async function register({ datos }) {
  const graphqlMutation = {
    operationName: "register",
    query: `mutation register{
        register(datos: {username: "${datos.username}", password: "${datos.password}", email: "${datos.email}", firstName: "${datos.firstName}", lastName: "${datos.lastName}", avatar: "${datos.avatar}", age: ${datos.age}}) {
          token
        }
      }`,
  };
  const options = {
    url: "http://localhost:3000/graphql",
    method: "POST",
    data: graphqlMutation,
  };

  const response = await axios(options);
  return response.data.data.register.token;
}

async function getAllUsers(arrayQueries) {
  let values = "";
  arrayQueries.forEach((i) => {
    values += `${i}\n`;
  });

  const graphqlQuery = {
    operationName: "getUsers",
    query: `query getUsers{
              getUsers {
                ${values}
              }
            }`,
  };

  const options = {
    url: "http://localhost:3000/graphql",
    method: "GET",
    data: graphqlQuery,
  };

  const response = await axios(options);
  return response.data.data.getUsers;
}

async function getOneUser({ _id }, arrayQueries) {
  let values = "";
  arrayQueries.forEach((i) => {
    values += `${i}\n`;
  });
  const graphqlQuery = {
    operationName: "getUser",
    query: `query getUser{
        getUser(_id:"${_id}"){
          ${values}
        }
      }`,
  };

  const options = {
    url: "http://localhost:3000/graphql",
    method: "GET",
    data: graphqlQuery,
  };

  const response = await axios(options);
  return response.data.data.getUser;
}

export { login, register, getAllUsers, getOneUser };
