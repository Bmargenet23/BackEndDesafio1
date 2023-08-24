import { Router } from "express";
import ProductManager from "../dao/file/ProductManager.js";

const productManager = new ProductManager("./db/products.json");
export const router = Router();

router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    const { limit } = req.query;
    console.log(limit);

    if (limit) {
        const limitedProducts = products.slice(0, parseInt(limit));
        res.send(limitedProducts);
    } else {
        res.send(products);
    }
});

router.get('/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);
    console.log(product);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: "Producto no encontrado" });
    }
});

router.put('/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    const updatedProduct = await productManager.updateProduct(productId, req.body);
    if (updatedProduct) {
        res.send(updatedProduct);
    } else {
        res.status(404).send({ message: "Producto no encontrado" });
    }
});

router.delete('/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    const deletedProduct = await productManager.deleteProduct(productId);
    console.log(deleteProduct);

    if (deletedProduct) {
        res.send({ message: "Se ha borrado el producto" });
    } else {
        res.status(404).send({ message: "Producto no encontrado" });
    }
});
