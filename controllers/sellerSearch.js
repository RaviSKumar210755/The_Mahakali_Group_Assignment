import { Op } from "sequelize";
import Seller from "../models/sellerModel.js";
import client from "../utils/redisClient.js";

const sellerSearchController = async (req, res) => {
  try {
    const { dealerId, id, name, mobile } = req.query;
    let page = parseInt(req.query.page) || 1;
    const limit = 100;
    const offset = (page - 1) * limit;

    const cacheKey = `sellerSearch:${dealerId}:page:${page}:id:${
      id || ""
    }:name:${name || ""}:mobile:${mobile || ""}`;

    const cachedData = await client.get(cacheKey);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    const searchConditions = [];
    if (id) searchConditions.push({ seller_id: { [Op.eq]: id } });
    if (name)
      searchConditions.push({ seller_name: { [Op.like]: `%${name}%` } });
    if (mobile)
      searchConditions.push({ seller_mobile: { [Op.like]: `%${mobile}%` } });

    const whereCondition = {
      dealer_id: dealerId,
      ...(searchConditions.length > 1
        ? { [Op.and]: searchConditions }
        : searchConditions.length === 1
        ? searchConditions[0]
        : {}),
    };

    const { count, rows: sellers } = await Seller.findAndCountAll({
      where: whereCondition,
      attributes: [
        "seller_id",
        "seller_name",
        "seller_mobile",
        "total_sales",
        "total_orders",
      ],
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
    console.error(error);
    res.status(400).json({ error: "Something went wrong" });
  }
};

export default sellerSearchController;
