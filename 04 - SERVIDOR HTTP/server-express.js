const express = require("express");
const server = express();
const port = 8000;

const products = [
  {
    id: 1,
    name: "prod1",
    price: 100,
  },
  {
    id: 2,
    name: "prod2",
    price: 200,
  },
  {
    id: 3,
    name: "prod3",
    price: 300,
  },
];

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello World!");
});

server.get("/products", (req, res) => {
  //   console.log(req.query.price);
  const { price } = req.query;
  const productsFilter = products.filter((p) => p.price >= parseInt(price));
  res.json(productsFilter);
  //!  PRECIO MAYOR O IGUAL A: __200__ | BUSCAR | --> GET http://localhost:8080/products?price=200
});

server.get("/products/:id", (req, res) => {
  //   console.log(req.params.id);
  //   console.log(req.body);

  const { id } = req.params;
  const product = products.find((p) => p.id === parseInt(id));
  res.json(product);
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
