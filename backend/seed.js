// require the necessary libraries
const { faker } = require('@faker-js/faker');
const mongoose = require("mongoose")
const Product = require("./model")
require('dotenv').config()


async function seedData() {
    // Connection URL
    const uri = process.env.MONGO_URL
    const seed_count = 10000;
    mongoose.set("strictQuery", false);
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to db")
    }).catch((err) => {
        console.log("error", err)
    })

    let randomStatus = () =>{
        const status = ['pending', 'processing', 'completed', 'cancelled']
        let randomIndex = Math.floor(Math.random()* status.length) 
        return status[randomIndex]  
    }

    let randomProductList = () =>{
        let totalProduct =  Math.floor(Math.random() * (5 - 1) + 1)
        
        let arr = []
        for(let i=0; i<totalProduct; i++){
            const name = faker.commerce.productName();
            const price = faker.commerce.price();
            const quantity = Math.floor(Math.random() * (3 - 1) + 1)
    
            let obj = {name, price, quantity}
            arr.push(obj)
        }
    return arr
    }
    

    let timeSeriesData = [];
   
    for (let i = 0; i < seed_count; i++) {
        const customerName = faker.person.fullName();
        const orderAmount = faker.commerce.price()
        const status = randomStatus()
        const createdAt = faker.date.past()
        const items = randomProductList()
        timeSeriesData.push({ customerName, orderAmount, status, createdAt,items });
    }

    const seedDB = async () => {
        await Product.insertMany(timeSeriesData)
    }

    seedDB().then(() => {
        mongoose.connection.close()
        console.log("seed success")
    })
}

seedData()




