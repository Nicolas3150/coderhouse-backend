import BaseService from "./base.service.js";
import DaoFactory from "../daos/daoFactory.js";
import ProductDTO from "../dtos/product.dto.js";

const daoFactory = new DaoFactory();
const productDao = daoFactory.createProductDao();

class ProductService extends BaseService {
  constructor() {
    super(productDao);
  }

  create = async (product) => {
    const newProduct = new ProductDTO(product);
    return await productDao.create(newProduct.item);
  };
}

export default ProductService;
