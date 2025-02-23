import Seller from "./../../models/sellerModel.js";
import flushCache from "../../utils/flushAll.js";
const createSellerController = async (req, res) => {
  try {
    await flushCache();
    console.log("Request Body:", req.body);
    const sellerArray = Array.isArray(req.body) ? req.body : [req.body];

    for (let i = 0; i < sellerArray.length; i++) {
      const {
        seller_id,
        dealer_id,
        seller_name,
        seller_mobile,
        total_sales,
        total_orders,
        category,
      } = sellerArray[i];

      console.log(`Processing Seller: ${seller_name}, Dealer ID: ${dealer_id}`);

      if (!dealer_id) {
        return res
          .status(400)
          .json({ success: false, error: "dealer_id is required" });
      }

      await Seller.create({
        seller_id,
        dealer_id,
        seller_name,
        seller_mobile,
        total_sales,
        total_orders,
        category,
      });
    }

    res.status(201).json("All sellers created successfully");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export default createSellerController;
