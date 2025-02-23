import express from "express";
import bodyParser from "body-parser";
import dotEnv from "dotenv";

import totalSellerRoute from "./routes/totalSellers.js";
import totalEarningRoute from "./routes/totalEarning.js";
import topSellerRoute from "./routes/topSellers.js";
import earningGraphRoute from "./routes/earningGraph.js";
import sellerDetailsRoute from "./routes/sellerDetails.js";
import sellerSearcherRoute from "./routes/sellerSearch.js";
import sortApiRoute from "./routes/sortApi.js";
import filterRoute from "./routes/filter.js";
import dealerCodeRoute from "./routes/dealerCode.js";

import userRoleRoute from "./test/routes/userRole.js";
import userRoute from "./test/routes/createUser.js";
import sellerRoute from "./test/routes/seller.js";
import productOrderRoute from "./test/routes/productOrder.js";

dotEnv.config();

const app = express();

app.use(bodyParser.json());
app.use(totalSellerRoute);
app.use(totalEarningRoute);
app.use(topSellerRoute);
app.use(earningGraphRoute);
app.use(sellerDetailsRoute);
app.use(sellerSearcherRoute);
app.use(sortApiRoute);
app.use(filterRoute);
app.use(dealerCodeRoute);

app.use(userRoute);
app.use(userRoleRoute);
app.use(sellerRoute);
app.use(productOrderRoute);

const port = process.env.PORT || 3000;

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("server is running");
  }
});
