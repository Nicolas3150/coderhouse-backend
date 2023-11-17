import ProductController from "../controllers/product.controller.js";

class ProductRoute {
  constructor() {
    this.controller = new ProductController();
  }

  start() {
    return {
      getAllProducts: this.controller.getAllProducts,
      getOneProduct: this.controller.getOneProduct,
      createProduct: this.controller.createProduct,
      updateProduct: this.controller.updateProduct,
      deleteProduct: this.controller.deleteProduct,
    };
  }
}

export default ProductRoute;
