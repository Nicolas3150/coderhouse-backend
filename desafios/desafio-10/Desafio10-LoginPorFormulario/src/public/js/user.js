import username from "./userContainer.js";

fetch("http://localhost:8080/user")
  .then((res) => res.json())
  .then((user) => {
    document.querySelector("#UserName").innerHTML = `Bienvenid@ ${user}`;
    username.putUsername(user);
  });

document.querySelector("#logout-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const user = username.getUsername();
  fetch("http://localhost:8080/logout");
  document.querySelector(
    "body"
  ).innerHTML = `<div class="productContainer"><h1>Hasta luego ${user}</h1></div>`;
  setTimeout(() => {
    window.location.href = "http://localhost:8080/";
  }, 2000);
});
