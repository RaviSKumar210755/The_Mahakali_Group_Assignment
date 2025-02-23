import { literal } from "sequelize";
import Seller from "../models/sellerModel.js";
import client from "../utils/redisClient.js";

const sellerDetailsController = async (req, res) => {
  try {
    const { dealerId } = req.query;
    let page = parseInt(req.query.page) || 1;
    const limit = 100;
    const offset = (page - 1) * limit;

    const cacheKey = `sellerDetails:${dealerId}:page:${page}`;
    console.log("Checking cache in seller Details... before creating");

    const cachedData = await client.get(cacheKey);
    if (cachedData) {
      console.log("Checking cache in seller Details... before creating");
      return res.status(200).json(JSON.parse(cachedData));
    }

    const { count, rows: seller } = await Seller.findAndCountAll({
      where: { dealer_id: dealerId },
      attributes: [
        "seller_id",
        "seller_name",
        "seller_mobile",
        "total_sales",
        "total_orders",
        [literal("0.007 * total_sales"), "commission"],
      ],
      limit,
      offset,
    });

    const responseData = {
      totalRecords: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      result: seller,
      cache: false,
    };

    await client.setEx(cacheKey, 360, JSON.stringify(responseData));

    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Something went wrong" });
  }
};

export default sellerDetailsController;
