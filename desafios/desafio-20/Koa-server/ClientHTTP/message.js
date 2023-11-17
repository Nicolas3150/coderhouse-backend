import axios from "./axios.js";

async function getAllMessages(token) {
  try {
    const response = await axios.get("/api/mensajes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    return err.response;
  }
}

async function sendMessage(token, newMessage) {
  try {
    const response = await axios.post(
      "/api/mensajes",
      { ...newMessage },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
  } catch (err) {
    return err.response.data;
  }
}

export { getAllMessages, sendMessage };
