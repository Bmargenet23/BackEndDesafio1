import express from "express";
import ProductManager from './ProductManager.js';
import {router} from "./routes/ProductsRoutes.js";

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api/products",router)

app.listen (8080, ()=>{
    console.log ("Servidor escuchando en puerto 8080")
})