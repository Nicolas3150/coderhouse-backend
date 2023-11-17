import ProductContainer from "../containers/productContainer.js";

const apiMock = new ProductContainer();

const getProducts = async (req, res) => {
  try {
    apiMock.createProducts(5);
    const response = await apiMock.getAll();
    res.json(response).status(201);
  } catch (err) {
    res.json({ error: true, message: err });
  }
};

export { getProducts };
