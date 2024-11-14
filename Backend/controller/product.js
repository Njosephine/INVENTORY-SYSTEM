import  Product from "../models/product.js";
import Purchase  from "../models/purchase.js";
import  Sales  from "../models/sales.js";
import { v2 as cloudinary } from "cloudinary";
const addProduct = async (req, res) => {
  try {
    console.log("Received userId:", req.body.userId);

    const imageFile = req.file;
    if (!imageFile) {
      return res.status(400).send("No image uploaded");
    }

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    // If image upload fails, return a detailed error message
    if (!imageUpload || !imageUpload.secure_url) {
      console.error("Cloudinary upload failed:", imageUpload);
      return res.status(500).send("Error uploading image to Cloudinary");
    }

    // Extract the image URL from the upload response
    const imageUrl = imageUpload.secure_url;

    // Create a new product object with the image URL
    const newProduct = new Product({
      userID: req.body.userId,
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      stock: 0, // Initial stock set to 0
      description: req.body.description,
      image: imageUrl, // Store the Cloudinary image URL
    });

    // Save the product to the database
    const result = await newProduct.save();
    res.status(200).send(result); // Respond with the saved product

  } catch (err) {
    console.error("Error in addProduct:", err);
    res.status(500).send("Error adding product");
  }
};


// Get All Products
const getAllProducts = async (req, res) => {
  const findAllProducts = await Product.find({
    userID: req.params.userId,
  }).sort({ _id: -1 }); // -1 for descending;
  res.json(findAllProducts);
};

// Delete Selected Product
const deleteSelectedProduct = async (req, res) => {
  const deleteProduct = await Product.deleteOne(
    { _id: req.params.id }
  );
  const deletePurchaseProduct = await Purchase.deleteOne(
    { ProductID: req.params.id }
  );

  const deleteSaleProduct = await Sales.deleteOne(
    { ProductID: req.params.id }
  );
  res.json({ deleteProduct, deletePurchaseProduct, deleteSaleProduct });
};

// Update Selected Product
const updateSelectedProduct = async (req, res) => {
  try {
    const updatedResult = await Product.findByIdAndUpdate(
      { _id: req.body.productID },
      {
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
      },
      { new: true }
    );
    console.log(updatedResult);
    res.json(updatedResult);
  } catch (error) {
    console.log(error);
    res.status(402).send("Error");
  }
};

// Search Products
const searchProduct = async (req, res) => {
  const searchTerm = req.query.searchTerm;
  const products = await Product.find({
    name: { $regex: searchTerm, $options: "i" },
  });
  res.json(products);
};

export {
  addProduct,
  getAllProducts,
  deleteSelectedProduct,
  updateSelectedProduct,
  searchProduct,
};
