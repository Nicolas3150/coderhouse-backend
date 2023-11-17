import BaseRepository from "./BaseRepository.js";
import DaoFactory from "../daos/daoFactory.js";
import ProductDTO from "../dtos/product.dto.js";

const daoFactory = new DaoFactory();
const productDao = daoFactory.createProductDao();

class ProductRepository extends BaseRepository {
  constructor() {
    super(productDao);
  }

  create = async (req, res) => {
    const newProduct = new ProductDTO(req.body);
    res.json(await productDao.create(newProduct.item));
  };
}

export default ProductRepository;
