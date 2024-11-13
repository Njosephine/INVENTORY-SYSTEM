import express from "express"
const app = express();
import  {addPurchase, getPurchaseData, getTotalPurchaseAmount}  from "../controller/purchase.js";

// Add Purchase
app.post("/add", addPurchase);

// Get All Purchase Data
app.get("/get/:userID", getPurchaseData);

app.get("/get/:userID/totalpurchaseamount", getTotalPurchaseAmount);

export default app;

// http://localhost:4000/api/purchase/add POST
// http://localhost:4000/api/purchase/get GET
