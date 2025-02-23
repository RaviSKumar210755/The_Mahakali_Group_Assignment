import User from "../models/userModel.js";
import client from "../utils/redisClient.js";

const dealerCodeController = async (request, response) => {
  const dealerId = request.query.dealerId;

  console.log("DealerId:", dealerId);

  try {
    const cachedDealer = await client.get(`dealerCode:${dealerId}`);
    if (cachedDealer) {
      console.log(`Cache hit for dealerId: ${dealerId}`);
      return response
        .status(200)
        .send({ result: JSON.parse(cachedDealer), cache: true });
    }

    const dealer = await User.findOne({ where: { id: dealerId } });

    if (!dealer) {
      return response.status(404).send({ error: "Dealer not found" });
    }

    const res = dealer.referral_code;
    await client.setEx(`dealerCode:${dealerId}`, 3600, JSON.stringify(res));
    response.status(200).send({ result: res });
  } catch (error) {
    console.error("Error in dealerCodeController:", error);
    response.status(500).send({ error: "Something went wrong" });
  }
};

export default dealerCodeController;
