import Seller from "../models/sellerModel.js";
import client from "../utils/redisClient.js";

const totalEarningController = async (request, response) => {
  const dealerId = request.query.dealerId;

  try {
    const cacheKey = `totalEarning:${dealerId}`;

    const cachedEarning = await client.get(cacheKey);
    if (cachedEarning) {
      return response
        .status(200)
        .json({ result: JSON.parse(cachedEarning), cache: true });
    }

    const totalEarning = await Seller.sum("total_sales", {
      where: { dealer_id: dealerId },
    });

    const earnings = totalEarning * 0.007;

    await client.setEx(cacheKey, 3600, JSON.stringify(earnings));

    response.status(200).json({ result: earnings, cache: false });
  } catch (error) {
    console.error(error);
    response.status(400).json({ error: "Something went wrong" });
  }
};

export default totalEarningController;
