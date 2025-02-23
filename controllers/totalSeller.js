import Seller from "../models/sellerModel.js";
import client from "../utils/redisClient.js";

const totalSellerController = async (request, response) => {
  const dealerId = request.query.dealerId;

  try {
    const cacheKey = `totalSellers:${dealerId}`;

    const cachedSellers = await client.get(cacheKey);
    if (cachedSellers) {
      return response
        .status(200)
        .json({ result: JSON.parse(cachedSellers), cache: true });
    }

    const totalSellers = await Seller.count({
      where: { dealer_id: dealerId },
    });

    await client.setEx(cacheKey, 3600, JSON.stringify(totalSellers));

    response.status(200).json({ result: totalSellers, cache: false });
  } catch (error) {
    console.error(error);
    response.status(400).json({ error: "Something went wrong" });
  }
};

export default totalSellerController;
