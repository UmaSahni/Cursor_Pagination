const express = require("express");
const productRouter = express.Router();
const Product = require("../model.js");

const LIMIT = 50;
productRouter.get("/", async (req, res) => {
  try {
    const cursor = req.query.cursor || null; 
    const sortField = req.query.sort || "_id"; 
    const sortDirection = req.query.sortDirection === "desc" ? -1 : 1;

    const baseUrl = `https://cursor-pagination-dq7l.onrender.com/products`; // Base URL for the API
    
    
    // Filter for cursor
    const filter = cursor ? { _id: { [sortDirection === 1 ? "$gt" : "$lt"]: cursor } } : {};

     // Sort criteria
     const sortCriteria = { [sortField]: sortDirection };

     // Fetch data
     const products = await Product.find(filter)
     .sort(sortCriteria)
     .limit(LIMIT + 1); // Fetch one extra to determine if there is a next page

    // Determine if there's a next page
    const hasNextPage = products.length > LIMIT;

    // Calculate remaining count
    const remainingCount = await Product.countDocuments(filter) - (hasNextPage ? LIMIT : products.length);

    // Prepare the response data
    const responseData = {
      count: remainingCount, // Remaining data count
      next: hasNextPage ? `${baseUrl}?cursor=${products[LIMIT - 1]._id}&sort=${sortField}&sortDirection=${sortDirection === 1 ? "asc" : "desc"}` : null, // URL for the next page
      results: products.slice(0, LIMIT), // Limit the results to 50
    };

    res.json(responseData);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "An error occurred while fetching products" });
  }
});

module.exports = productRouter;
