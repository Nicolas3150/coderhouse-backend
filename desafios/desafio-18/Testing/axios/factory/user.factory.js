import { faker } from "@faker-js/faker";
faker.locale = "es";

function generateUser() {
  return {
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    avatar: faker.image.avatar(),
    age: faker.random.numeric(),
  };
}

export default {
  generateUser,
};
