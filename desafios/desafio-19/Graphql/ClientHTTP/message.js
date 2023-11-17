import axios from "axios";

async function getAllMessages(arrayQueries) {
  try {
    let values = "";
    arrayQueries.forEach((i) => {
      values += `${i}\n`;
    });
    const graphqlQuery = {
      operationName: "getAll",
      query: `query getAll{
            getAll{
                ${values}
          }
        }`,
    };

    const options = {
      url: "http://localhost:3000/graphql/api/mensajes",
      method: "GET",
      data: graphqlQuery,
    };
    const response = await axios(options);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
}

async function sendMessage({ datos }) {
  const graphqlMutation = {
    operationName: "sendMessage",
    query: `mutation sendMessage{
        sendMessage(datos:{token: "${datos.token}", author: "${datos.author}", text: "${datos.text}", date: "${datos.date}"}){
            author,
            text,
            date,
          }
        }`,
  };
  const options = {
    url: "http://localhost:3000/graphql/api/mensajes",
    method: "POST",
    data: graphqlMutation,
  };

  const response = await axios(options);
  return response.data;
}

export { getAllMessages, sendMessage };
