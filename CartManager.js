import fs from "fs/promises";

export default class CartManager {
  constructor(ruta) {
    this.carts = [];
    this.ruta = ruta;
  }

  async addCart() {
    try {
      const newCart = {
        id: this.carts.length ? this.carts[this.carts.length - 1].id + 1 : 1,
        products: [],
      };

      this.carts.push(newCart);
      await this.saveCarts();

      return newCart;
    } catch (e) {
      console.log(e);
    }
  }

  async getCarts() {
    try {
      const file = await fs.readFile(this.ruta, "utf8");
      this.carts = JSON.parse(file);
      return this.carts;
    } catch (error) {
      console.log("Error al obtener los carritos:", error);
      return [];
    }
  }

  async saveCarts() {
    try {
      await fs.writeFile(this.ruta, JSON.stringify(this.carts));
    } catch (error) {
      console.log("Error al guardar los carritos:", error);
    }
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    const cart = carts.find((c) => c.id === id);
    if (!cart) {
      console.error("Carrito no encontrado");
      return;
    }
    console.log(cart);
    return cart;
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    const carts = await this.getCarts();
    const cartIndex = carts.findIndex((c) => c.id === cartId);
    if (cartIndex === -1) {
      console.error("Carrito no encontrado");
      return;
    }

    const product = {
      productId,
      quantity,
    };

    const existingProductIndex = carts[cartIndex].products.findIndex(
      (p) => p.productId === productId
    );

    if (existingProductIndex !== -1) {
      carts[cartIndex].products[existingProductIndex].quantity += quantity;
    } else {
      carts[cartIndex].products.push(product);
    }

    await this.saveCarts();
    return carts[cartIndex];
  }
}