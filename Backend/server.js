
import express from "express";

import cors from "cors";
import productRoute from "./router/product.js";
import storeRoute from "./router/store.js";
import purchaseRoute from "./router/purchase.js";
import salesRoute from "./router/sales.js";
import User from "./models/users.js";
import Product from "./models/product.js";
import ERentalRoute from "./router/ERentalRoute.js";
import dotenv from 'dotenv';
dotenv.config();
import {connectCloudinary} from "./config/cloudinary.js"
import connectDB from "./config/mongodb.js"


const app = express();
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()
app.use(express.json());
app.use(cors());

// Store API
app.use("/api/store", storeRoute);
app.use("/api/rental", ERentalRoute);

// Products API
app.use("/api/product", productRoute);

// Purchase API
app.use("/api/purchase", purchaseRoute);

// Sales API
app.use("/api/sales", salesRoute);

// ------------- Signin --------------
let userAuthCheck;
app.post("/api/login", async (req, res) => {
  console.log(req.body);
  // res.send("hi");
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    console.log("USER: ", user);
    if (user) {
      res.send(user);
      userAuthCheck = user;
    } else {
      res.status(401).send("Invalid Credentials");
      userAuthCheck = null;
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// Getting User Details of login user
app.get("/api/login", (req, res) => {
  res.send(userAuthCheck);
});
// ------------------------------------

// Registration API
app.post("/api/register", (req, res) => {
  let registerUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    imageUrl: req.body.imageUrl,
  });

  registerUser
    .save()
    .then((result) => {
      res.status(200).send(result);
      alert("Signup Successfull");
    })
    .catch((err) => console.log("Signup: ", err));
  console.log("request: ", req.body);
});


app.get("/testget", async (req,res)=>{
  const result = await Product.findOne({ _id: '6429979b2e5434138eda1564'})
  res.json(result)

})

// Here we are listening to the server
app.listen(port, () => console.log(`Server started on PORT:${port}`))

app.get("/", (req, res) => {
  res.send("API Working")
});
