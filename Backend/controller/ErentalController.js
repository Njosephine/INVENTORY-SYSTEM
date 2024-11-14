
import Product from "../models/product.js";

// Function to send only required data to the e-rental system
const getProductsForErental = async (req, res) => {
  try {
    // Fetch all products globally, but only pick the required fields for the e-rental system
    const productsForErental = await Product.find({}).select('name description image'); 

    // Send the filtered products
    res.json(productsForErental);
  } catch (error) {
    console.error("Error fetching products for e-rental:", error);
    res.status(500).send("Error fetching products for e-rental");
  }
};

export { getProductsForErental };
