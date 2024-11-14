import express from "express"

import{addProduct,
getAllProducts,
deleteSelectedProduct,
updateSelectedProduct,
searchProduct }from "../controller/product.js";

import upload from '../Middleware/multer.js';

const app = express();

// Add Product
app.post("/add",upload.single('image'), addProduct);

// Get All Products
app.get("/get/:userId", getAllProducts);

// Delete Selected Product Item
app.get("/delete/:id", deleteSelectedProduct);

// Update Selected Product
app.post("/update", updateSelectedProduct);

// Search Product
app.get("/search", searchProduct);

// http://localhost:4000/api/product/search?searchTerm=fa

export default app;