import {promises as fs} from 'fs';
import { nanoid } from 'nanoid';


class ProductManager {
    constructor() {
        this.path = "./src/models/products.json"
    }

    readProducts = async () => {
        let products = await fs.readFile(this.path, "utf-8");
        return JSON.parse(products);
    }

    writeProducts = async(product) => {
        await fs.writeFile(this.path, JSON.stringify(product));
    }

    exist = async (id) => {
        let products = await this.readProducts();
        return products.find(prod => prod.id === id)
    }

    addProducts = async (product) => {
        let productsOld = await this.getProducts();
        product.id = nanoid();
        let productAll = [...productsOld, product];
        await this.writeProducts(productAll);
        return "Producto Agregado";
    };

    //Produsctos
    getProducts = async () => {
        return await this.readProducts()
    };

    //busqueda por Id
    getProductsById = async (id) => {
       let productsById = await this.exist(id);
       if (!productsById) return "No se encontró el producto.";
       return productsById
    };

    //Actualizar
    updateProducts = async (id, product) => {
        let productsById = await this.exist(id)
        if(!productsById) return 'El Producto no existe'
        await this.deleteProducts(id)
        let productsOld = await this.readProducts()
        let products =[{...product, id : id}, ...productsOld]
        await this.writeProducts(products)
        return "Producto actualizado."
    }

    //Borrar
    deleteProducts = async (id) => {
        let products = await this.readProducts();
        let existProducts = products.some(prod => prod.id === id)
        if(existProducts) {
            let filterProducts = products.filter(prod => prod.id !== id)
            await this.writeProducts(filterProducts)
            return "Producto eliminado."
        }
        return "Producto a eliminar inexistente."
    }
}

export default ProductManager;

