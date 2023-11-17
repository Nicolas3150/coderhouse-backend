document
  .getElementById("formRegister")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      let urlAvatar;
      const dataAvatar = new FormData(document.getElementById("updateAvatar"));
      const formDataObj = {};
      dataAvatar.forEach((value, key) => (formDataObj[key] = value));
      if (formDataObj.avatar.name != "") {
        const response = await fetch("/api/register/upload", {
          method: "POST",
          body: dataAvatar,
        });
        urlAvatar = await response.text();
      } else {
        urlAvatar = "default.png";
      }

      const dataForm = document.getElementsByClassName("registerForm");
      const datos = {};
      for (let i = 0; i < dataForm.length; i++) {
        datos[dataForm[i].name] = dataForm[i].value;
      }
      const addressForm = document.getElementsByClassName("address");
      const address = {};
      for (let i = 0; i < addressForm.length; i++) {
        address[addressForm[i].name] = addressForm[i].value;
      }
      const birthdayForm = document.getElementsByClassName("birthday");
      let birthday = "";
      for (let i = 0; i < birthdayForm.length; i++) {
        birthday += birthdayForm[i].value;
        if (i > 0 && i < birthdayForm.length) {
          birthday += "-";
        }
      }
      const data = new URLSearchParams({
        ...datos,
        address: JSON.stringify({ ...address }),
        avatar: urlAvatar,
        birthday: birthday,
      });
      await fetch("/api/register", {
        method: "POST",
        body: data,
      });
    } catch (error) {
      console.log(error);
    }
  });
