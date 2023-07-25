import express from "express";
//import ProductManager from './ProductManager.js';
//import {router} from "./routes/ProductsRoutes.js";
import { router as productsRouter } from "./routes/ProductsRoutes.js";
import { router as cartsRouter } from "./routes/CartsRoutes.js";

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
//app.use("/api/products",router)
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen (8080, ()=>{
    console.log ("Servidor escuchando en puerto 8080")
}) 