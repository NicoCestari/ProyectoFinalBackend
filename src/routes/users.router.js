import { Router } from "express";
import { productsModel } from "../models/products.model.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        let products = await productsModel.find()
        res.status(200).send({
            status: 200,
            result: "success",
            payload:users
        })
    } catch (error) {
        console.log("Error in getting all products : ", error);
        res.status(500).send({
            status: 500,
            result:"error",
            error:"Internal Server Error"
        });
    }
})