const mongoose = require('mongoose')

async function connect(){
    try{
        await mongoose.connect('mongodb://localhost:27017/E-commerce',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Connect Successfully")
    }
    catch(error){
        console.log("connection failure")
    }
}

module.exports = { connect }
