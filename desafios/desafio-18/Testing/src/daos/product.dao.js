import { Product } from "../models/product.model.js";
import CustomError from "../utils/CustomError.js";
import DAO from "./DAO.js";

let instance = null;

class ProductDao extends DAO {
  constructor() {
    super();
    this.collection = Product;
  }

  getAll = async () => {
    try {
      const productCollection = await this.collection.find();
      return productCollection;
    } catch (error) {
      throw new CustomError(500, "Error getting products");
    }
  };

  getById = async (id) => {
    try {
      const product = await this.collection.findById({ _id: id });
      return product;
    } catch (error) {
      throw new CustomError(500, "Error getting product by id");
    }
  };

  create = async (productToCreate) => {
    try {
      const createdProduct = await this.collection.create(productToCreate);
      return createdProduct;
    } catch (error) {
      throw new CustomError(500, "Error creating product");
    }
  };

  update = async (id, product) => {
    try {
      await this.collection.updateOne({ _id: id }, { $set: { ...product } });
      return;
    } catch (error) {
      throw new CustomError(500, "Error modify product");
    }
  };

  delete = async (id) => {
    try {
      await this.collection.deleteOne({ _id: id });
      return;
    } catch (error) {
      throw new CustomError(500, "Error delete product");
    }
  };

  static getInstance() {
    if (!instance) {
      instance = new ProductDao();
    }
    return instance;
  }
}

export default ProductDao;
