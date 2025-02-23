import { DataTypes } from "sequelize";
import sequelize from "./db_connect.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    secure_id: {
      type: DataTypes.CHAR(32),
      unique: true,
    },
    role_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(191),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(191),
      allowNull: false,
      unique: true,
    },
    email_verify_token: DataTypes.STRING(255),
    is_email: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_phone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    otp: DataTypes.STRING(6),
    password: DataTypes.STRING(191),
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
    referral_code: DataTypes.STRING(20),
    phone_verified_at: DataTypes.DATE,
    email_verified_at: DataTypes.DATE,
    remember_token: DataTypes.STRING(100),
    reset_token: DataTypes.STRING(200),
    reset_token_expiry: DataTypes.BIGINT,
  },
  {
    tableName: "Users",
    timestamps: true,
    paranoid: true,
  }
);

export default User;
