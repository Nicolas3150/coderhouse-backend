fetch(`/user`)
  .then((res) => res.json())
  .then((user) => {
    document.querySelector(
      "#UserName"
    ).innerHTML = `Bienvenid@ ${user.username}`;
    document.querySelector("#userEmail").innerHTML = `${user.email}`;
  });

document.querySelector("#logout-btn").addEventListener("click", (e) => {
  e.preventDefault();
  location.href = `/logout`;
});
