import express from "express";
import productRouter from "./routes/product-router.js";
import cartRouter from "./routes/cart-router.js";
import { loggerHttp } from "./middlewares/logger-http.js";

const server = express();
const port = 8000;

server.use(express.json());
server.use(loggerHttp);

server.use('/api/products', productRouter);
server.use('/api/carts', cartRouter);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
