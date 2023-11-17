import ProductService from "../services/product.service.js";
import jwt from "../utils/jwt.js";

class ProductController {
  constructor() {
    this.service = new ProductService();
  }

  getAllProducts = async () => {
    try {
      const products = await this.service.getAll();
      return products;
    } catch (err) {
      console.log(err);
    }
  };

  getOneProduct = async ({ _id }) => {
    try {
      const product = await this.service.getById(_id);
      return product;
    } catch (err) {
      console.log(err);
    }
  };

  createProduct = async ({ datos }) => {
    try {
      if (jwt.authMiddleware(datos.token))
        return { error: "Error of validations" };
      const product = await this.service.create(datos);
      return product;
    } catch (err) {
      console.log(err);
    }
  };

  updateProduct = async ({ _id, datos }) => {
    try {
      if (jwt.authMiddleware(datos.token))
        return { error: "Error of validations" };
      await this.service.update(_id, datos);
      const product = await this.service.getById(_id);
      return product;
    } catch (err) {
      console.log(err);
    }
  };

  deleteProduct = async ({ _id, token }) => {
    try {
      if (jwt.authMiddleware(token)) return { error: "Error of validations" };
      const productToDelete = await this.service.getById(_id);
      await this.service.delete(_id);
      return productToDelete;
    } catch (err) {
      console.log(err);
    }
  };
}

export default ProductController;
