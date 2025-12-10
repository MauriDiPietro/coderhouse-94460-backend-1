const socket = io();

let username = null;

if (!username) {
  Swal.fire({
    title: "¡Bienvenido/a al chat!",
    input: "text",
    text: "Por favor, ingresa tu nombre de usuario:",
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "¡Necesitas ingresar un nombre de usuario para continuar!";
      }
    },
  }).then((input) => {
    username = input.value;
    socket.emit("new-user", username);
  });
}

socket.on("new-user", (username) => {
  Toastify({
    text: `${username} inició sesión`,
    duration: 3000,
    // destination: "https://github.com/apvarun/toastify-js",
    // newWindow: true,
    // close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
});

const actions = document.getElementById("actions");
const btn = document.getElementById("send");
const output = document.getElementById("output");
const message = document.getElementById("message");

btn.addEventListener("click", () => {
  socket.emit("chat:message", {
    username,
    message: message.value,
  });
  message.value = "";
});

socket.on("messages", (data) => {
  actions.innerHTML = "";
  const chat = data
    .map((msg) => {
      return `<p><strong>${msg.username}</strong>: ${msg.message}</p>`;
    })
    .join(" ");

  output.innerHTML = chat;
});

message.addEventListener("keypress", () => {
  socket.emit("chat:typing", username);
});

socket.on("chat:typing", (data) => {
  actions.innerHTML = `<p><em>${data} está escribiendo un mensaje...</em></p>`;
});
