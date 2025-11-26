import express from "express";
import productRouter from "./routes/product-router.js";
import cartRouter from "./routes/cart-router.js";
import { loggerHttp } from "./middlewares/logger-http.js";

const server = express();
const port = 8000;
// console.log(`Working directory: ${process.cwd()}`);
server.use(express.json());
server.use(loggerHttp);
server.use(express.static(`${process.cwd()}/src/public`));

server.use('/api/products', productRouter);
server.use('/api/carts', cartRouter);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
