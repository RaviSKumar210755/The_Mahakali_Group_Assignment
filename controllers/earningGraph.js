import Seller from "../models/sellerModel.js";
import Product from "../models/productOrder.js";
import { QueryTypes } from "sequelize";
import sequelize from "../models/db_connect.js";
import client from "../utils/redisClient.js";

const earningGraphController = async (request, res) => {
  try {
    Seller.hasMany(Product, { foreignKey: "seller_id" });
    Product.belongsTo(Seller, { foreignKey: "seller_id" });

    const dealerId = request.query.dealerId;

    const cachedEarning = await client.get(`earning:${dealerId}`);
    if (cachedEarning) {
      return res
        .status(200)
        .send({ result: JSON.parse(cachedEarning), cache: true });
    }

    const salesData = await sequelize.query(
      `SELECT 
        DAY(p.created_at) AS day, 
        SUM(p.gross_amount) AS total_sales 
      FROM product_orders AS p 
      JOIN seller AS s ON p.seller_id = s.seller_id 
      WHERE s.dealer_id = :dealerId
      GROUP BY  DAY(p.created_at)`,
      {
        replacements: { dealerId },
        type: QueryTypes.SELECT,
      }
    );

    if (salesData) {
      await client.setEx(
        `earning:${dealerId}`,
        3600,
        JSON.stringify(salesData)
      );
    }

    res.status(200).send({ result: salesData });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error: " + error.message);
  }
};
export default earningGraphController;
