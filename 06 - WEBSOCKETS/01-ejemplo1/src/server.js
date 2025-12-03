import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";

const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  res.render("websocket");
});

const httpServer = app.listen(8080, () => {
  console.log("Escuchando al puerto 8080");
});

const socketServer = new Server(httpServer);

const products = [];

socketServer.on("connection", (socket) => {
  console.log(`Nuevo cliente conectado: ${socket.id}`);

  socket.emit("mensaje-server", "Bienvenido a websockets");

  socket.on("mensaje-client", (message) => {
    console.log(message);
  });

  socketServer.emit('array-productos', products);

  socket.on('new-product', (obj) => {
    products.push(obj);
    socketServer.emit('array-productos', products);
  })
});
