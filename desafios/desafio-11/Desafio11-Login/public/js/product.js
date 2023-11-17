const socket = io();

async function renderProducts(products) {
  const response = await fetch("../views/productList.hbs");
  const plantilla = await response.text();

  const template = Handlebars.compile(plantilla);
  const html = template({ products, render: products.length !== 0 ? 1 : 0 });
  document.querySelector("#prodTable").innerHTML = html;
}

socket.on("server:products", () => {
  fetch("http://localhost:8080/api/productos-test", { method: "GET" })
    .then((response) => response.json())
    .then((products) => {
      renderProducts(products);
    })
    .catch((err) => {
      console.log("error al pegar a la api");
    });
});
