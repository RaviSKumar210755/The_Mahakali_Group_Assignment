import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(" DB connected successfully");

    await sequelize.sync({ force: false });
    console.log(" Database synchronized");
  } catch (error) {
    console.error(" DB connection failed:", error);
    setTimeout(connectDB, 5000);
  }
};

connectDB();

export default sequelize;
