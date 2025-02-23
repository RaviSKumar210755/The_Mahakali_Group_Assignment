import { Op, literal } from "sequelize";
import Seller from "../models/sellerModel.js";
import client from "../utils/redisClient.js";

const dateFilter = async (request, response) => {
  const { dealerId, start, end, page = 1 } = request.query;
  const pageNum = parseInt(page) || 1;
  const limit = 100;
  const offset = (pageNum - 1) * limit;

  try {
    const cacheKey = `dateFilter:${dealerId}:${start}:${end}:${pageNum}`;

    const cachedData = await client.get(cacheKey);
    if (cachedData) {
      return response.status(200).json(JSON.parse(cachedData));
    }

    const { count, rows: sellers } = await Seller.findAndCountAll({
      where: {
        dealer_id: dealerId,
        createdAt: {
          [Op.gte]: literal(`DATE('${start}')`),
          [Op.lte]: literal(`DATE('${end}')`),
        },
      },
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

    const result = {
      totalRecords: count,
      totalPages: Math.ceil(count / limit),
      currentPage: pageNum,
      result: sellers,
    };

    await client.setEx(cacheKey, 3600, JSON.stringify(result));

    response.status(200).json(result);
  } catch (err) {
    console.error(err);
    response.status(400).json({ error: "Something went wrong" });
  }
};

const earnFilter = async (request, response) => {
  const { dealerId, threshold, page = 1 } = request.query;
  const pageNum = parseInt(page) || 1;
  const limit = 100;
  const offset = (pageNum - 1) * limit;

  try {
    const cacheKey = `earnFilter:${dealerId}:${threshold}:${pageNum}`;

    const cachedData = await client.get(cacheKey);
    if (cachedData) {
      return response.status(200).json(JSON.parse(cachedData));
    }

    const { count, rows: sellers } = await Seller.findAndCountAll({
      where: {
        dealer_id: dealerId,
        total_sales: {
          [Op.lte]: literal(`${threshold} / 0.993`),
        },
      },
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

    const result = {
      totalRecords: count,
      totalPages: Math.ceil(count / limit),
      currentPage: pageNum,
      result: sellers,
    };

    await client.setEx(cacheKey, 3600, JSON.stringify(result));

    response.status(200).json(result);
  } catch (err) {
    console.error(err);
    response.status(400).json({ error: "Something went wrong" });
  }
};

const sellerCategoryFilter = async (request, response) => {
  const { dealerId, category, page = 1 } = request.query;
  const pageNum = parseInt(page) || 1;
  const limit = 100;
  const offset = (pageNum - 1) * limit;

  try {
    const cacheKey = `sellerCategoryFilter:${dealerId}:${category}:${pageNum}`;

    const cachedData = await client.get(cacheKey);
    if (cachedData) {
      return response.status(200).json(JSON.parse(cachedData));
    }

    const { count, rows: sellers } = await Seller.findAndCountAll({
      where: { dealer_id: dealerId, category },
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

    const result = {
      totalRecords: count,
      totalPages: Math.ceil(count / limit),
      currentPage: pageNum,
      result: sellers,
    };

    await client.setEx(cacheKey, 3600, JSON.stringify(result));

    response.status(200).json(result);
  } catch (err) {
    console.error(err);
    response.status(400).json({ error: "Something went wrong" });
  }
};

export { dateFilter, earnFilter, sellerCategoryFilter };
