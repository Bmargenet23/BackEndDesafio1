const Product = require("./Products.js");

class ProductManager {
    products = [];
    idNumber = 0;

    addProduct(data) {
        if (this.validateCode(data[4])) {
            console.error("El código ya existe");
            return;
        }

        if (this.validateObject(data)) {
            console.error("Hay campos sin completar");
            return;
        }

        const newProduct = {
            code: this.nextCode++,
            ...data
        };

        this.products.push(newProduct);
    }

    getProducts() {
        console.table(this.products);
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((p) => p.id === id);
        if (!product) {
            console.error("Not found");
            return;
        }
        console.log(product);
        return product;
    }

    generateID() {
        if (this.idNumber === 0) {
            this.idNumber = 1;
            return;
        }
        this.idNumber++;
    }

    validateCode(code) {
        if (this.products.find((p) => p.code === code)) {
            return true;
        }
    }

    validateObject(data) {
        if (data.length !== 6) return true;
        data.map((element) => {
            if (element === "" || element === undefined || element === null || element === 0) return true;
        });
    }
}

const test = new ProductManager();

test.addProduct(["zapatillas", "nike rojas", 150, "http://", "1", 20]);
test.addProduct(["botas", "zara negras", 130, "http://", "2", 20]);
test.addProduct(["botas", "zara blancas", 110, "http://", "3", 30]);
test.addProduct(["ojotas", "havaianas crudo", 110, "http://", "3", 20]);
test.addProduct(["zapatillas", , 110, "http://", "4", 15,]);
test.addProduct(["zapatillas", "adidas verde", 110, "5", ,]);
test.getProducts();
test.getProductById();
test.getProductById(5);
test.validateCode(4);
test.validateObject(3);