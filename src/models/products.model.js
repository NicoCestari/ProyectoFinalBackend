import mongoose from "mongoose";

const userCollection = 'products'

const productsSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String,
    price: Number,
    stock: Boolean,
});

export const productsModel = mongoose.model(userCollection, productsSchema);