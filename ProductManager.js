import fs from "fs/promises";

export default class ProductManager {
    constructor(ruta) {
        this.products = [];
        this.ruta = ruta;
    }

    async addProduct(data) {
        try {
            const newProduct = {
                id: this.products.length ? this.products[this.products.length - 1].id + 1 : 1,
                title: data.title,
                description: data.description,
                price: data.price,
                thumbnail: data.thumbnail,
                code: data.code,
                stock: data.stock,
            }

            if (this.validateCode(data)) {
                console.error("El código ya existe");
                return
            }

            if (this.validateObject(data)) {
                console.error("Hay campos sin completar");
                return
            }

            //const file = await fs.readFile("./products.json", "utf8");
            //const products = JSON.parse(file);
            const products = await this.getProducts();
            products.push(newProduct);

            this.products.push(newProduct);
            await fs.writeFile(this.ruta, JSON.stringify(products));

            return newProduct;
        } catch (e) {
            console.log(e);
        }

    };

    async getProducts() {
        const file = await fs.readFile(this.ruta, "utf8");
        console.log(file)
        const products = JSON.parse(file);

        return products;
    };

    async getProductById(id) {
        this.products = await this.getProducts();
        const product = this.products.find((p) => p.id === id);
        if (!product) {
            console.error("Not found");
            return;
        }
        console.log(product);
        return product;
    }


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

    async updateProduct(id, updatedFields) {
        this.products = this.getProducts();
        try {
            const productIndex = this.products.findIndex((p) => p.id === id);
            if (productIndex === -1) {
                console.error("Not found");
                return;
            }

            const updatedProduct = {
                ...this.products[productIndex],
                ...updatedFields,
                id: this.products[productIndex].id, // me aseguro de que el ID no se modifique
            };

            this.products[productIndex] = updatedProduct;

            await this.saveProducts();

            return updatedProduct;
        } catch (error) {
            console.log("Error al actualizar el producto:", error);
        }



    } async deleteProduct(id) {
        this.products = this.getProducts();
        try {
            const productIndex = this.products.findIndex((p) => p.id === id);
            if (productIndex === -1) {
                console.error("Not found");
                return;
            }

            this.products.splice(productIndex, 1);

            await this.saveProducts();

            console.log("Producto eliminado correctamente");
        } catch (error) {
            console.log("Error al borrar el producto:", error);
        }
    }
}


const test = new ProductManager("./products.json");

//await test.addProduct({ title: "zapatillas", description: "zara negras", price: 1000, thumbnail: "http://a", code: 1000, stock: 50 });
//await test.addProduct({ title: "botas", description: "zara blancas", price: 1080, thumbnail: "http://dfg", code: 1001, stock: 55 });
//await test.addProduct({ title: "ojotas", description: "havaianas", price: 400, thumbnail: "http://df", code: 1001, stock: 50 });
//await test.addProduct({ title: "zapatillas", price: 1200, thumbnail: "http://qw", code: 1003, stock: 50 });
//await test.addProduct({ title: "zapatillas", description: "adidas verdes", price: 900, thumbnail: "http://qwe", code: 1012, stock: 50 });
await test.getProducts();
//test.getProductById(1);
//await test.deleteProduct(2);
//await test.getProducts();