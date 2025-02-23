# Dealer Management API

## 📌 Project Setup

Follow these steps to set up and run the project:

### 1️⃣ Install Dependencies
```sh
npm install
```

### 2️⃣ Start Redis Server
Ensure Redis is running by executing:
```sh
redis-server
```

### 3️⃣ Configure Environment Variables
Create a `.env` file and add the following credentials:
```env
PORT=8005
DB_NAME=mydb
DB_USER=root
DB_PASSWORD=IITISM@ravi123
DB_HOST=localhost
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379
```

### 4️⃣ Start the Server
Run the command:
```sh
npm run dev
```
This will start the server and synchronize the database.

---

## 🚀 API Endpoints

### 📌 Total Sellers API
```
GET http://localhost:8005/topSellersApi?dealerId=<Dealer Id>
```

### 📌 Total Earnings API
```
GET http://localhost:8005/totalEarningApi?dealerId=<Dealer Id>
```

### 📌 Dealer Code API
```
GET http://localhost:8005/dealerCodeApi?dealerId=<Dealer Id>
```

### 📌 Top Sellers API
```
GET http://localhost:8005/topSellersApi?dealerId=<Dealer Id>
```

### 📌 Earnings Graph API
```
GET http://localhost:8005/earningGraphApi?dealerId=<Dealer Id>
```

### 📌 Seller Details API
```
GET http://localhost:8005/sellerDetailsApi?dealerId=<Dealer Id>
```

### 📌 Search API
```
GET http://localhost:8005/sellerSearchApi?dealerId=<Dealer Id>&name=<Seller Name>&id=<Seller Id>&mobile=<Seller Mobile>
```

### 📌 Sort API
#### Sort by Sales:
```
GET http://localhost:8005/sortApi/sales?dealerId=<Dealer Id>
```
#### Sort by Orders:
```
GET http://localhost:8005/sortApi/orders?dealerId=<Dealer Id>
```
#### Sort by Earnings:
```
GET http://localhost:8005/sortApi/earnings?dealerId=<Dealer Id>
```
#### Sort by Seller Name:
```
GET http://localhost:8005/sortApi/sellerName?dealerId=<Dealer Id>
```

### 📌 Filter API
#### Filter by Date Range:
```
GET http://localhost:8005/filter/date?dealerId=<Dealer Id>&start=<YYYY-MM-DD>&end=<YYYY-MM-DD>&page=<Page NO.>
```
#### Filter by Earning Threshold:
```
GET http://localhost:8005/filter/earning?dealerId=<Dealer Id>&threshold=<Upper Limit Of Earning>&page=<Page No.>
```
#### Filter by Seller Category:
```
GET http://localhost:8005/filter/seller_category?dealerId=<Dealer Id>&category=<Seller category>&page=<Page No.>
```
