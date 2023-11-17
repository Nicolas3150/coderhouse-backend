class ProductDTO {
  constructor(data) {
    this.item = { ...data, timestamp: Date.now().toString() };
  }
}

export default ProductDTO;
