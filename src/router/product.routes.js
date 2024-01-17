import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const product = new ProductManager();
const ProductRouter = Router()

ProductRouter.get("/products",async (req, res) => {
    let limit = req.query.limit;

    let products =await product.getProducts();


    if (limit) {
        limit = parseInt(limit);

        if (!isNaN(limit) && limit > 0) {
            products = products.slice(0, limit);
        } else {
            return res.status(400).send({ mensaje: "El parámetro 'limit' debe ser un número entero mayor que cero." });
        }
    }

    res.send(products);
});

ProductRouter.get("/:id", async (req, res) => {
    let id = req.params.id
    res.send(await product.getProductsById(id))
})

ProductRouter.post("/", async (req, res) => {
    try {
       
        const { title, description, code, price, stock, category, thumbnails } = req.body;

        
        if (!title || !description || !code || !price || !stock || !category || !thumbnails) {
            return res.status(400).send("Todos los campos son obligatorios.");
        }

        
        const id = nanoid();
        const status = true;

        
        const newProduct = {
            id,
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails,
        };

        
        const result = await product.addProducts(newProduct);

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno del servidor");
    }
});

ProductRouter.put("/:id", async (req, res) => {
    let id = req.params.id
    let updateProduct = req.body;
    res.send(await product.updateProducts(id, updateProduct));
})
ProductRouter.delete("/:id", async (req, res) => {
    let id = req.params.id
    res.send(await product.deleteProducts(id));
})

export default ProductRouter;