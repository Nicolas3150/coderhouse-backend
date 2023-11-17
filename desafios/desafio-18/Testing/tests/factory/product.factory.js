import { faker } from "@faker-js/faker";
faker.locale = "es";

function generateProduct() {
  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: faker.random.alphaNumeric(5),
    price: faker.commerce.price(100, 200, 0),
    thumbnail: faker.internet.avatar(),
    stock: faker.random.numeric(),
  };
}

export default { generateProduct };
