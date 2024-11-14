import express from "express";
import {getProductsForErental} from "../controller/ErentalController.js";

const router = express.Router();

router.get("/products", getProductsForErental);

export default router;