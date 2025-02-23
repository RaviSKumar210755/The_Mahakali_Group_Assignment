import { DataTypes } from "sequelize";
import sequelize from "./db_connect.js";

const Seller = sequelize.define(
  "Seller",
  {
    seller_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    dealer_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    seller_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seller_mobile: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    total_sales: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
    },
    total_orders: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Seller",
    indexes: [
      { unique: false, fields: ["dealer_id"] },
      { unique: false, fields: ["seller_mobile"] },
      { unique: false, fields: ["seller_name"] },
      { unique: false, fields: ["seller_id"] },
    ],
  }
);

export default Seller;
