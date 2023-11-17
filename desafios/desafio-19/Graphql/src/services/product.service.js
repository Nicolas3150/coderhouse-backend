import BaseService from "./base.service.js";
import DaoFactory from "../daos/daoFactory.js";

const daoFactory = new DaoFactory();
const productDao = daoFactory.createProductDao();

class ProductService extends BaseService {
  constructor() {
    super(productDao);
  }

  create = async (newProduct) => {
    return await productDao.create({
      ...newProduct,
      timestamp: Date.now().toString(),
    });
  };
}

export default ProductService;
