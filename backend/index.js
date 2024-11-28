const express = require("express")
const cors = require('cors')
const mongoose = require("mongoose")
const productRouter = require("./routes/product.routes")
const app = express()
require('dotenv').config()

app.use(express.json())
app.use(cors())
app.use("/products", productRouter)


app.listen(process.env.PORT, async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)

        console.log("DataBase is connected")
        console.log(`App is running on port ${process.env.PORT}`)
    } catch (error) {
        console.log("Error in connecting with DB")
    }
    
})