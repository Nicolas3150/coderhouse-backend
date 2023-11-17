fetch("http://localhost:8080/user")
  .then((res) => res.json())
  .then((user) => {
    document.querySelector(
      "#UserName"
    ).innerHTML = `Bienvenid@ ${user.username}`;
    document.querySelector("#userEmail").innerHTML = `${user.email}`;
  });

document.querySelector("#logout-btn").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "http://localhost:8080/logout";
});
