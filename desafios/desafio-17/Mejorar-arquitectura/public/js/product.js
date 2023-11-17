const socket = io();

async function renderProducts(products) {
  const response = await fetch("../views/productList.hbs");
  const plantilla = await response.text();

  const template = Handlebars.compile(plantilla);
  const html = template({ products, render: products.length !== 0 ? 1 : 0 });
  document.querySelector("#prodTable").innerHTML = html;

  const items = document.getElementsByClassName("btnDelete");
  for (let i = 0; i < items.length; i++) {
    document.getElementById(items[i].id).addEventListener("click", async () => {
      await fetch(`/api/productos/${items[i].id}`, {
        method: "DELETE",
      });
      socket.emit("client:products");
    });
  }
}

async function getProducts() {
  const response = await fetch(`/api/productos`, {
    method: "GET",
  });
  const productos = await response.json();
  return productos;
}

function resetForm() {
  document.getElementById("productForm").reset();
}

document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new URLSearchParams(
    new FormData(document.getElementById("productForm"))
  );
  await fetch("/api/productos", {
    method: "POST",
    body: data,
  });
  socket.emit("client:products");
  resetForm();
});

socket.on("server:products", async () => {
  await renderProducts(await getProducts());
});
