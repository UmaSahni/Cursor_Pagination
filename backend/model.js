const mongoose = require("mongoose");


// Sub-document schema for items
const itemSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  });



const productSchema = new mongoose.Schema({
    customerName:{
     type:String,
     required:true   
    },
    orderAmount:{
        type:Number,
        required:true,
        default: 0,
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'cancelled'],
        default: 'pending',
      },
      items: {
        type: [itemSchema], // Embedding the itemSchema
        required: true,
        validate: [array => array.length > 0, 'Items array cannot be empty'],
      },
    createdAt: {
        type: Date,
        default:Date.now,
    },
})


const Product = mongoose.model("Product",productSchema)
module.exports = Product;