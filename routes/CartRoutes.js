import { Router } from "express";
import CartManager from "../CartManager.js";

const cartManager = new CartManager("./db/carts.json");
export const router = Router();

router.post("/", async (req, res) => {
  const newCart = await cartManager.addCart();
  res.send(newCart);
});

router.get("/:cid", async (req, res) => {
  const cartId = parseInt(req.params.cid);
  const cart = await cartManager.getCartById(cartId);
  if (cart) {
    res.send(cart);
  } else {
    res.status(404).send({ message: "Carrito no encontrado" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);
  const { quantity } = req.body;

  if (!quantity || typeof quantity !== "number" || quantity <= 0) {
    res.status(400).send({ message: "La cantidad debe ser un número positivo" });
    return;
  }

  const cart = await cartManager.addProductToCart(cartId, productId, quantity);
  if (cart) {
    res.send(cart);
  } else {
    res.status(404).send({ message: "Carrito no encontrado" });
  }
});