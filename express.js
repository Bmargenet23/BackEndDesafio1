import express from "express";
import handlebars from "express-handlebars";
import http from "http";
import { Server } from "socket.io";
import ProductManager from "./ProductManager.js";
import { router as productsRouter } from "./routes/ProductsRoutes.js";
import { router as cartsRouter } from "./routes/CartRoutes.js";

const app = express()
const server = http.createServer(app);
const io = new Server(server);
const test = new ProductManager("./db/products.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const hbs = handlebars.create({
  helpers: {
    layout: function (layout, options) {
      return hbs.handlebars.templates[layout]({ ...this, body: options.fn(this) });
    },
  },
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

handlebars.create({
  helpers: {
    layout: function (layout, options) {
      return layouts[layout]({ ...this, body: options.fn(this) });
    }
  }
});

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


app.get("/", async (req, res) => {
  const products = await test.getProducts();
  res.render("home", { products });
});

io.on("connection", (socket) => {
  console.log("Un cliente se ha conectado");

  socket.on("addProduct", (productData) => {

    console.log("Evento addProduct recibido:", productData);

    io.emit("productAdded", newProduct);
  });


  socket.on("deleteProduct", (productId) => {

    console.log("Evento deleteProduct recibido:", productId);

    io.emit("productDeleted", productId);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});


app.listen(8080, () => {
  console.log("Servidor escuchando en puerto 8080")
})  