# Project Setup and API Usage Guide

## Setup Instructions

1. Install dependencies:
   ```sh
   npm i
   ```
2. Configure environment variables in `.env` file:
   ```env
   PORT=8005
   DB_NAME=Your_DB_Name
   DB_USER=Db_UserName
   DB_PASSWORD=DB_Password
   DB_HOST=localhost
   JWT_SECRET=your_jwt_secret
   REDIS_URL=redis://localhost:6379
   ```
 
3. Start Redis server:
   ```sh
   redis-server
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```
   This will connect the database and synchronize it.

## API Endpoints

### 1. Total Sellers API
   ```
   GET http://localhost:8005/topSellersApi?dealerId=<Dealer_Id>
   ```
### 2. Total Earnings API
   ```
   GET http://localhost:8005/totalEarningApi?dealerId=<Dealer_Id>
   ```
### 3. Dealer Code API
   ```
   GET http://localhost:8005/dealerCodeApi?dealerId=<Dealer_Id>
   ```
### 4. Top Sellers API
   ```
   GET http://localhost:8005/topSellersApi?dealerId=<Dealer_Id>
   ```
### 5. Earnings Graph API
   ```
   GET http://localhost:8005/earningGraphApi?dealerId=<Dealer_Id>
   ```
### 6. Seller Details API
   ```
   GET http://localhost:8005/sellerDetailsApi?dealerId=<Dealer_Id>
   ```
### 7. Search API
   ```
   GET http://localhost:8005/sellerSearchApi?dealerId=<Dealer_Id>&name=<Seller_Name>&id=<Seller_Id>&mobile=<Seller_Mobile>
   ```
### 8. Sort API
   ```
   GET http://localhost:8005/sortApi/sales?dealerId=<Dealer_Id>
   GET http://localhost:8005/sortApi/orders?dealerId=<Dealer_Id>
   GET http://localhost:8005/sortApi/earnings?dealerId=<Dealer_Id>
   GET http://localhost:8005/sortApi/sellerName?dealerId=<Dealer_Id>
   ```
### 9. Filter API
   ```
   GET http://localhost:8005/filter/date?dealerId=<Dealer_Id>&start=<YYYY-MM-DD>&end=<YYYY-MM-DD>&page=<Page_No.>
   GET http://localhost:8005/filter/earning?dealerId=<Dealer_Id>&threshold=<Upper_Limit_Of_Earning>&page=<Page_No.>
   GET http://localhost:8005/filter/seller_category?dealerId=<Dealer_Id>&category=<Seller_category>&page=<Page_No.>
   ```

## Data Insertion APIs for Testing

### 1. Create Seller
   ```
   POST http://localhost:8005/create-seller
   ```
   **Request Body:**
   ```json
   [
     {
       "seller_id": 12,
       "dealer_id": 4,
       "seller_name": "John Doe",
       "seller_mobile": "9876543210",
       "total_sales": 5080,
       "total_orders": 10,
       "category": "Electronics"
     }
   ]
   ```
### 2. Create User
   ```
   POST http://localhost:8000/create-user
   ```
   **Request Body:**
   ```json
   [
     {
       "secure_id": "12338567890abef1234567890abcdef",
       "role_id": 4,
       "name": "John Doe",
       "email": "johndoe@example.com",
       "is_email": true,
       "is_phone": true,
       "phone": "+1234367890",
       "password": "securepassword",
       "is_active": true,
       "status": 1,
       "referral_code": "REF18345XYZ"
     }
   ]
   ```
### 3. Create User Role
   ```
   POST http://localhost:8000/create-user-role
   ```
   **Request Body:**
   ```json
   {
     "type": "DEALER",
     "is_active": true
   }
   ```
### 4. Create Product Order
   ```
   POST http://localhost:8000/create-productOrder
   ```
   **Request Body:**
   ```json
   [
     {
       "seller_id": 5,
       "user_id": 105,
       "product_variant_id": 1005,
       "product_id": 5005,
       "order_id": 9005,
       "quantity": 5,
       "tax_amount_id": 3005,
       "transaction_type": "COD",
       "address_id": 7005,
       "logistics_tracking_link": "https://tracking.com/127",
       "coupon_discount": 15.00,
       "bank_discount": 6.00,
       "no_return_discount": 2.00,
       "cod_charges": 7.00,
       "shipping_charges": 25.00,
       "packing_charges": 8.00,
       "handling_charges": 3.00,
       "net_amount": 195.00,
       "gross_amount": 220.00,
       "indiazona_price": 180.00,
       "checkout_logistics_price": 40.00,
       "awb_number": "AWB123460",
       "nimbus_label": "Label127",
       "nimbus_manifest": "Manifest127",
       "product_order_code": "POC123460",
       "cancelled_at": null
     }
   ]
   ```

