# Cursor Pagination Implimentation
## Created a high-performance full-stack application that implements a virtual scrolling table with cursor-based pagination, handling a large dataset of *10,000 records*.

# Features
1. Responsive for all screen size ✅
2. Cursor-based pagination ✅
4. Used `useInfiniteQuery` for data fetching ✅
5. Takes approximately 200 ms for api call ✅
6. Loading indicators shown when data fetching. ✅

# **API Documentation**

## **GET /products**

Fetches a paginated and sorted list of products.



### **Query Parameters:**

| Parameter | Type   | Description                           |
|-----------|--------|---------------------------------------|
| `cursor`  | String | Cursor for pagination (optional).     |
| `sort`    | String | Field to sort by (e.g., `price`).     |
| `order`   | String | Sorting order: `asc` or `desc`.       |

---

### **Example Request:**
```
http://localhost:5000/products
```

### Example Response
```json
{
  "count": 100, 
  "next": "http://localhost:5000/products?cursor=63f72b89&sort=price&order=asc", 
  "results": [
    { "_id": "63f72b88", "name": "Product 1", "price": 10 },
    { "_id": "63f72b89", "name": "Product 2", "price": 20 }
  ]
}

```

----

# Installation (Backend)
### 1.Clone the repository: 
1. ```git clone Cursor_Pagination```
2. ```cd Cursor_Pagination```
3. ```cd backend```
### 2.Install dependencies:
`npm install`
### 3.Create a .env file in the root directory and configure your MongoDB connection:
```MONGO_URI=mongodb://<username>:<password>@<host>:<port>/<database>```
```PORT=5000```
### 4.Seed the database
`npm run seed`
### 5.Start the server:
`npm start`
### 6. Access the API at 
`http://localhost:5000/products`

----
# Installation (Fronted)
### 1. Move to fronted directory
`cd fronted`
### 2.Install dependencies:
`npm install`
### 3.Create a .env file in the root directory 
`VITE_BASE_URL=http://localhost:5000/products`
### 4.Start the server:
`npm run dev`

-----

# UI Preview on Desktop
![image](https://github.com/user-attachments/assets/fd7f1b84-11ab-4e53-8e83-fde1da19f7a4)
# UI Preview on Mobile
![image](https://github.com/user-attachments/assets/3ab2b567-9237-41bc-a66d-0987d993ef98)






