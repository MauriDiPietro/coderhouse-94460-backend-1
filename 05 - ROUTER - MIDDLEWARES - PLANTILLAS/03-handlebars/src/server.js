import express from "express";
import handlebars from "express-handlebars";
import productRouter from "./routes/product-router.js";
import cartRouter from "./routes/cart-router.js";
import viewsRouter from "./routes/views-router.js";
import { loggerHttp } from "./middlewares/logger-http.js";

const server = express();
const port = 8000;

server.use(express.json());
server.use(loggerHttp);
server.use(express.static(`${process.cwd()}/src/public`));

server.engine('handlebars', handlebars.engine());
server.set('view engine', 'handlebars');
server.set('views', `${process.cwd()}/src/views`);

server.use('/api/products', productRouter);
server.use('/api/carts', cartRouter);
server.use('/', viewsRouter)

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
