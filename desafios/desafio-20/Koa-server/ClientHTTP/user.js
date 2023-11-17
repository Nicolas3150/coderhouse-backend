import axios from "./axios.js";

async function login({ username, password }) {
  try {
    const res = await axios.post("/auth/login", {
      username: username,
      password: password,
    });
    return res.data.data;
  } catch (err) {
    console.log(err.response.data);
  }
}

async function register(user) {
  try {
    const res = await axios.post("/auth/register", user);
    return res.data.data;
  } catch (err) {
    console.log(err.response.data);
  }
}

async function getOneUser(token, id) {
  try {
    const res = await axios.get(`/auth/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  } catch (err) {
    return err.response.data;
  }
}

export { login, register, getOneUser };
