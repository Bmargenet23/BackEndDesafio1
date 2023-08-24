import express from "express";
import handlebars from "express-handlebars";
import http from "http";
import { Server } from "socket.io";
//import ProductManager from "./dao/file/ProductManager.js";
import ProductManager from "./dao/mongo/ProductManager.js";
import { router as productsRouter } from "./routes/ProductsRoutes.js";
import { router as cartsRouter } from "./routes/CartRoutes.js";
import mongoose from "mongoose";
import messagesManagerDB from "./dao/mongo/messagesManager.js";

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

const messageManager = new messagesManagerDB();
const conn = mongoose.connect("mongodb+srv://brianmargenet:34100067@coderbrian.6oeo6iu.mongodb.net/?retryWrites=true&w=majority")

app.get("/", async (req, res) => {
  const products = await test.getProducts();
  res.render("home", { products });
});

io.on("connection", async (socket) => {
  console.log("Un cliente se ha conectado");

  //socket.on("addProduct", (productData) => {

  const messages = await messageManager.getMessages();
  socket.emit("messageLogs", messages)
});


socket.on("deleteProduct", async (data) => {

  console.log("Evento deleteProduct recibido:", data.productId);

  await productManager.deleteProductbyId(data.productId)
  socket.emit('products', await productManager.getProducts())
});


socket.on("message", async (data) => {
  let user = data.user;
  let message = data.message;
  await messageManager.addMessage(user, message)
  const messages = await messageManager.getMessages();
  socket.emit("messageLogs", messages)
})

socket.on("disconnect", () => {
  console.log("Cliente desconectado");
});



app.listen(8080, () => {
  console.log("Servidor escuchando en puerto 8080")
})  