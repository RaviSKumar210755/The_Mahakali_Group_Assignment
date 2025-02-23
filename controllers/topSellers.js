import { literal } from "sequelize";
import Seller from "../models/sellerModel.js";
import client from "../utils/redisClient.js";

const topSellersController = async (request, response) => {
  try {
    const dealerId = request.query.dealerId;
    let { page = 1 } = request.query;
    page = parseInt(page) || 1;
    const limit = 100;
    const offset = (page - 1) * limit;

    const cacheKey = `topSellers:${dealerId}:page:${page}`;

    const cachedData = await client.get(cacheKey);
    if (cachedData) {
      return response.status(200).json(JSON.parse(cachedData));
    }

    const { count, rows: sellers } = await Seller.findAndCountAll({
      where: { dealer_id: dealerId },
      attributes: [
        "seller_id",
        "seller_name",
        "seller_mobile",
        "total_sales",
        "total_orders",
      ],
      order: [[literal("total_sales"), "DESC"]],
      limit,
      offset,
    });

    const responseData = {
      totalRecords: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      sellers,
      cache: false,
    };

    await client.setEx(cacheKey, 3600, JSON.stringify(responseData));

    response.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    response.status(400).json({ error: "Something went wrong" });
  }
};

export default topSellersController;
