const socket = io();

async function logueado() {
  try {
    const resToken = await fetch("/api/auth/refresh", {
      credentials: "include",
    });
    const { token } = await resToken.json();
    if (!resToken.ok) {
      window.location.href = "/api/auth/login";
    }
    return token;
  } catch (error) {
    console.log(error);
  }
}

async function renderMessage(chat) {
  const response = await fetch("../views/chat.hbs");
  const plantilla = await response.text();

  const template = Handlebars.compile(plantilla);

  if (!chat.messages.length) {
    document.querySelector(
      ".messageContainer"
    ).innerHTML = `<div class="Message"><h1>No hay mensajes</h1></div>`;
  } else {
    const html = await chat.messages
      .map((message) => {
        return template(message);
      })
      .join(" ");
    document.querySelector(".messageContainer").innerHTML = html;

    let messagesForUser = await getMessagesForUser();

    await chat.messages.map(async (message) => {
      document
        .querySelector(`#btn-link-${message.message._id}`)
        .addEventListener("click", (e) => {
          e.preventDefault();
          document.getElementById(
            `response-${message.message._id}`
          ).innerHTML = `
          <form class="chat" id="chat-${message.message._id}">
          <input
            type="text"
            placeholder="Escriba su respuesta..."
            id="res-${message.message._id}"
            name="message"
            class="res_message"
            required
          />
          <input type="submit" value="Enviar respuesta" class="btn" />
          </form>`;
          document
            .querySelector(`#chat-${message.message._id}`)
            .addEventListener("submit", (e) => {
              e.preventDefault();
              sendResponse(message.message._id);
            });
          //Verificar si el mensaje le corresponde al usuario para agregar botones de eliminarisYourMessage();
        });
      if (await isYourMessage(messagesForUser, message.message)) {
        document.querySelector(
          `#div-delete-${message.message._id}`
        ).innerHTML = `<button class="eliminar" id=delete-message-${message._id}>Eliminar</button>`;
        document
          .querySelector(`#delete-message-${message._id}`)
          .addEventListener("click", async (e) => {
            e.preventDefault();
            await deleteMessage(message.message._id);
          });
      }
      if (message.response.length) {
        message.response.forEach(async (res) => {
          if (await isYourMessage(messagesForUser, res))
            document.querySelector(
              `#div-delete-res-${res._id}`
            ).innerHTML = `<button class="eliminar-respuesta" id=delete-response-${res._id}>Eliminar respuesta</button>`;
          document
            .querySelector(`#delete-response-${res._id}`)
            .addEventListener("click", async (e) => {
              e.preventDefault();
              await deleteResponse(message.message._id, res._id);
            });
        });
      }
    });
  }
}

async function sendMessage() {
  try {
    const token = await logueado();
    const message = new URLSearchParams(
      new FormData(document.querySelector("#chat"))
    );
    await fetch("/api/chat", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: message,
    });
    await socket.emit("client");
  } catch (error) {
    console.log(error);
  }
}

async function sendResponse(id_message) {
  try {
    const token = await logueado();
    const message = new URLSearchParams(
      new FormData(document.querySelector(`#chat-${id_message}`))
    );
    await fetch(`/api/chat/${id_message}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: message,
    });
    await socket.emit("client");
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", async (e) => {
  try {
    await logueado();
    const logout = document.querySelector("#logout");
    logout.addEventListener("click", async () => {
      const res = await fetch("/api/auth/logout");
      if (res.ok) {
        window.location.href = "/api/auth/login";
      }
    });
    document
      .querySelector("#chat")
      .addEventListener("submit", async (event) => {
        event.preventDefault();
        await sendMessage();
        document.querySelector("#message").value = "";
      });
  } catch (error) {
    console.log(error);
  }
});

async function getMessagesForUser() {
  try {
    const token = await logueado();
    const messageArray = await fetch("/api/chat/user", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return await messageArray.json();
  } catch (error) {
    console.log(error);
  }
}

async function isYourMessage(arrayMessage, message) {
  const messageExists = arrayMessage.find((msj) => msj._id === message._id);
  if (messageExists) return true;
  return false;
}

async function deleteMessage(id_message) {
  try {
    const token = await logueado();
    await fetch(`/api/chat/${id_message}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    await socket.emit("client");
  } catch (error) {
    console.log(error);
  }
}

async function deleteResponse(id_message, id_response) {
  try {
    const token = await logueado();
    await fetch(`/api/chat/${id_message}/${id_response}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    await socket.emit("client");
  } catch (error) {
    console.log(error);
  }
}

socket.on("server", async (chat) => {
  await renderMessage(await chat);
});
