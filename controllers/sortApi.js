import Seller from "../models/sellerModel.js";
import client from "../utils/redisClient.js";

const sortSellers = async (req, res, sortField, sortOrder) => {
  try {
    const dealerId = req.query.dealerId;
    let page = parseInt(req.query.page) || 1;
    const limit = 100;
    const offset = (page - 1) * limit;

    const cacheKey = `sortSellers:${dealerId}:page:${page}:sort:${sortField}:${sortOrder}`;

    const cachedData = await client.get(cacheKey);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
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
      order: [[sortField, sortOrder]],
      limit,
      offset,
    });

    const responseData = {
      totalRecords: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      result: sellers,
      cache: false,
    };

    await client.setEx(cacheKey, 3600, JSON.stringify(responseData));

    res.status(200).json(responseData);
  } catch (error) {
    console.error(`Error in sorting by ${sortField}:`, error);
    res.status(400).json({ error: "Something went wrong" });
  }
};

export const sortbySales = (req, res) =>
  sortSellers(req, res, "total_sales", "DESC");
export const sortbyOrders = (req, res) =>
  sortSellers(req, res, "total_orders", "DESC");
export const sortbyEarnings = (req, res) =>
  sortSellers(req, res, "total_sales", "DESC");
export const sortbyName = (req, res) =>
  sortSellers(req, res, "seller_name", "ASC");
