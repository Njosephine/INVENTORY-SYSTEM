import Purchase from "../models/purchase.js";
import Product from"../models/product.js";

const purchaseStock = async (productID, purchaseStockData) => {
  // Updating Purchase stock
  try {
    const myProductData = await Product.findOne({ _id: productID });
    let myUpdatedStock = parseInt(myProductData.stock) + purchaseStockData;

    const PurchaseStock = await Product.findByIdAndUpdate(
      { _id: productID },
      {
        stock: myUpdatedStock,
      },
      { new: true }
    );
    console.log(PurchaseStock);
  } catch (error) {
    console.error("Error updating Purchase stock ", error);
  }
};

export{purchaseStock};
