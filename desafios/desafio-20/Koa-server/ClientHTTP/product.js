import axios from "./axios.js";

const getAllProducts = async (token) => {
  try {
    const res = await axios.get("/api/productos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

async function getOneProduct(token, id) {
  try {
    const response = await axios.get(`/api/productos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    return err.response.data;
  }
}

async function createProduct(token, newProduct) {
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
    return err.response.data;
  }
}

async function updateProduct(token, id, product) {
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
    return err.response.data;
  }
}

async function deleteProduct(token, id) {
  try {
    const response = await axios.delete(`/api/productos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    return err.response.data;
  }
}

export {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
