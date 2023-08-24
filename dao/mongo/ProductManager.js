//import fs from "fs/promises";
import ProductModel from "../models/product.schema.js";
import mongoose from "mongoose";

export default class ProductManager {
    constructor(ruta) {
        this.products = [];
        this.ruta = ruta;
    }

    async addProduct(product) {
        try {
            const producto = await ProductModel.insertMany([product])
            console.log(producto)
            return producto
        }
        catch {
            (e) => {
                console.log("Error en los datos ingresados")
            }
        }

    };

    async getProducts() {
        try {
            const products = await ProductModel.find();
            this.products = products;
            return this.products;

        } catch (e) {
            console.log(e)
        }
    }

    async getProductById(productId) {
        try {
            const product = await ProductModel.findById(productId)

            if (!product) return { status: 404, response: "Producto no encontrado." }

            return { status: 200, response: product }
        } catch (error) {
            console.log(`error: ${error}`)
        }
    }
/*
    validateCode(data) {
        if (this.products.some((p) => p.code == data.code)) {
            return true;
        }
    }

    validateObject(data) {
        if (data.hasOwnProperty("title") &&
            data.hasOwnProperty("description") &&
            data.hasOwnProperty("price") &&
            data.hasOwnProperty("thumbnail") &&
            data.hasOwnProperty("code") &&
            data.hasOwnProperty("stock")) {

            for (const property in data) {
                if (data[property] === "" ||
                    property === undefined ||
                    property === null ||
                    property === 0)
                    return true;
            }
        }
        else { return true };
    }

    async saveProducts() {
        try {
            await fs.writeFile(this.ruta, JSON.stringify(this.products));
        } catch (error) {
            console.log("Error al guardar los productos:", error);
        }
    }
*/
    async updateProduct(id, updatedFields) {
        try {
            const indexProduct = await ProductModel.findById(id)
            if (!indexProduct) return { status: 404, response: "Producto no encontrado." }
            const productData = indexProduct._doc
            console.log(productData)
            const updatedProduct = {
                ...productData,
                ...updatedFields
            }
            await ProductModel.updateOne({ _id: id }, updatedProduct)

            return { status: 200, response: "Producto actualizado." }


        } catch (error) {
            console.log(`error: ${error}`)
        }

    }


    async deleteProduct(id) {
        try {
            const products = await ProductModel.findByIdAndDelete(deleteId)
            const listaNueva = await ProductModel.find()
            this.products = listaNueva;
            return this.products;

        } catch (e) {
            console.log(e)
        }
    }
}


const test = new ProductManager("./db/products.json");

//await test.addProduct({ title: "zapatillas", description: "zara negras", price: 1000, thumbnail: "http://a", code: 1000, stock: 50 });
//await test.addProduct({ title: "botas", description: "zara blancas", price: 1080, thumbnail: "http://dfg", code: 1001, stock: 55 });
//await test.addProduct({ title: "ojotas", description: "havaianas", price: 400, thumbnail: "http://df", code: 1001, stock: 50 });
//await test.addProduct({ title: "zapatillas", price: 1200, thumbnail: "http://qw", code: 1003, stock: 50 });
//await test.addProduct({ title: "zapatillas", description: "adidas verdes", price: 900, thumbnail: "http://qwe", code: 1012, stock: 50 });
await test.getProducts();
//test.getProductById(1);
//await test.deleteProduct(2);
//await test.getProducts();