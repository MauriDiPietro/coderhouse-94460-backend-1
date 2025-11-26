import { v4 as uuidv4 } from "uuid";
import { productManager } from "./product-manager.js";

class CartManager {
  constructor(path) {
    this.path = path;
  }

  getAll = () => {};

  create = () => {
    try {
      const cart = {
        id: uuidv4(),
        products: [
            // {
            //     product: idProd
            //     quantity: 1
            // }
        ],
      };
      //getAll()
      //push()
      //writeFile()
    } catch (error) {}
  };

  getById = (id) => {};

  addProdToCart = (idCart, idProd) => {
    //verificar si el prod existe
    //prodManager.getById(idProd)

    //verificar si el cart existe

    //verificar si el prod existe dentro del cart
    //si existe, sumar 1 a la cantidad
    //si no existe, agregarlo al array products

    //actualizar sobreescribiendo el archivo
  };
}

export const cartManager = new CartManager("./data/carts.json");
