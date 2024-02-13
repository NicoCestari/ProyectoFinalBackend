import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import productsRouter from "./routes/products.router.js";
import { Server } from "socket.io";
import mongoose from "mongoose";


const app = express();

//mongoose.connect("mongodb+srv://cestarinicolasm:Bosque@1887@codercluster.cmxrrg7.mongodb.net/?retryWrites=true&w=majority")
mongoose.connect("mongodb://localhost:27017/test")

const httpServer = app.listen(8080, () => {
    console.log("Server is running on http://localhost:8080")
});

const io = new Server(httpServer);

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Handlebars middleware

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// Routes public
app.use(express.static(__dirname + "/public"));

const products = [];
io.on('connection', socket => {
    console.log('Nuevo cliente conectado')

    socket.on("addProduct", (product) => {
        productsRouter.getProducts().push(product);
        socket.emit("updateProducts", productsRouter.getProducts());
        socket.emit("addProduct", products)
    });

    socket.on("deleteProduct", (productId) => {
        
        const index = productsRouter.getProducts().findIndex((product) => product.id === productId);

       
        if (index !== -1) {
            productsRouter.getProducts().splice(index, 1);
            socket.emit("updateProducts", productsRouter.getProducts());
            socket.emit("deleteProduct", products)
        }
    });
})