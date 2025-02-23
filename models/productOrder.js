import { DataTypes } from "sequelize";
import sequelize from "./db_connect.js";

const ProductOrder = sequelize.define(
  "ProductOrder",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    seller_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_variant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tax_amount_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    transaction_type: DataTypes.STRING(100),
    address_id: DataTypes.INTEGER.UNSIGNED,
    logistics_tracking_link: DataTypes.TEXT,
    coupon_discount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    bank_discount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    no_return_discount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    cod_charges: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    shipping_charges: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    packing_charges: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    handling_charges: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    net_amount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    gross_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    indiazona_price: DataTypes.DECIMAL(10, 2),
    checkout_logistics_price: DataTypes.DECIMAL(10, 2),
    awb_number: DataTypes.STRING(50),
    nimbus_label: DataTypes.STRING(255),
    nimbus_manifest: DataTypes.STRING(255),
    product_order_code: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    cancelled_at: DataTypes.DATE,
  },
  {
    tableName: "product_orders",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: false,
        fields: ["seller_id"],
      },
    ],
  }
);

export default ProductOrder;
