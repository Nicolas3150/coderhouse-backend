import ProductService from "../services/product.service.js";

class ProductController {
  constructor() {
    this.service = new ProductService();
  }

  getAll = async (req, res) => {
    try {
      const response = await this.service.getAll();
      res.json(response);
    } catch (err) {
      console.log(err);
    }
  };

  getById = async (req, res) => {
    try {
      const product = await this.service.getById(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      console.log(err);
    }
  };

  create = async (req, res) => {
    try {
      const response = await this.service.create(req.body);
      res.status(201).json(response);
    } catch (err) {
      console.log(err);
    }
  };

  update = async (req, res) => {
    try {
      await this.service.update(req.params.id, req.body);
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }
  };

  delete = async (req, res) => {
    try {
      await this.service.delete(req.params.id);
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }
  };
}

export default ProductController;
