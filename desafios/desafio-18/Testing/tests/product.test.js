import { expect } from "chai";
import supertest from "supertest";
import productFactory from "./factory/product.factory.js";
import userFactory from "./factory/user.factory.js";

let token;
let request;
let id_prod;

describe("Product Route Test", () => {
  before(async () => {
    request = supertest("http://localhost:3000");

    const user = userFactory.generateUser();
    const register = await request.post("/register").send({
      username: "Prueba",
      password: "12345678",
      ...user,
    });
    const resRegister = JSON.parse(register.text);
    if (resRegister.message == "User already exists!") {
      const response = await request.post("/login").send({
        username: "Prueba",
        password: "12345678",
      });
      token = response.body.token;
    } else {
      token = JSON.parse(register.text).token;
    }
  });

  describe("- POST /api/productos", () => {
    const productToCreate = productFactory.generateProduct();
    let response;

    it("Shuld return code 201", async () => {
      response = await request
        .post("/api/productos")
        .set({ Authorization: `Bearer ${token}` })
        .send(productToCreate);
      id_prod = response.body._id;
      expect(response.status).to.eql(201);
    });

    it("Should return the created product", () => {
      expect(response.body.title).to.eql(productToCreate.title);
      expect(response.body.description).to.eql(productToCreate.description);
      expect(response.body.code).to.eql(productToCreate.code);
      expect(response.body.price).to.eql(Number(productToCreate.price));
      expect(response.body.thumbnail).to.eql(productToCreate.thumbnail);
      expect(response.body.stock).to.eql(Number(productToCreate.stock));
      expect(response.body).include.keys("timestamp", "_id");
    });
  });

  describe("- GET /api/productos", () => {
    let response;

    it("Should return the array of products", async () => {
      response = await request
        .get("/api/productos")
        .set({ Authorization: `Bearer ${token}` });

      expect(response.body).to.be.an("array");
    });

    it("Should return the product objects in the array or if the array is empty", () => {
      for (let i = 0; i < response.body.lenght; i++) {
        expect(response.body[i]).to.keys(
          "_id",
          "code",
          "description",
          "price",
          "stock",
          "thumbnail",
          "timestamp",
          "title"
        );
      }
    });
  });

  describe(`- GET /api/productos/:id`, () => {
    it(`Should return status 200 and the product with id: ${id_prod}`, async () => {
      const response = await request
        .get(`/api/productos/${id_prod}`)
        .set({ Authorization: `Bearer ${token}` });
      expect(response.status).to.eql(200);
      expect(response.body).to.keys(
        "__v",
        "_id",
        "code",
        "description",
        "price",
        "stock",
        "thumbnail",
        "timestamp",
        "title"
      );
    });
  });

  describe(`- PUT /api/productos/:id`, () => {
    let productModified = productFactory.generateProduct();

    it("Should return status code 200", async () => {
      const response = await request
        .put(`/api/productos/${id_prod}`)
        .set({ Authorization: `Bearer ${token}` })
        .send(productModified);

      expect(response.status).to.eql(200);
    });

    it("Should return the product that was modified", async () => {
      const response = await request
        .get(`/api/productos/${id_prod}`)
        .set({ Authorization: `Bearer ${token}` });

      expect(response.body.title).to.eql(productModified.title);
      expect(response.body.description).to.eql(productModified.description);
      expect(response.body.code).to.eql(productModified.code);
      expect(response.body.price).to.eql(Number(productModified.price));
      expect(response.body.thumbnail).to.eql(productModified.thumbnail);
      expect(response.body.stock).to.eql(Number(productModified.stock));
      expect(response.body).include.keys("timestamp", "_id");
    });
  });

  describe(`- DELETE /api/productos/:id`, () => {
    it("Should return status code 200", async () => {
      const response = await request
        .delete(`/api/productos/${id_prod}`)
        .set({ Authorization: `Bearer ${token}` });

      expect(response.status).to.eql(200);
    });

    it("Shuld return 'null'", async () => {
      const response = await request
        .get(`/api/productos/${id_prod}`)
        .set({ Authorization: `Bearer ${token}` });

      expect(response.body).to.eql(null);
    });
  });
});
