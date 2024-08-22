const mongoose = require("mongoose")

const connection = mongoose.connect(process.env.DATABASE).then(()=>console.log("Database is connected to server"))
.catch((error)=>console.log(`error connecting to database error : ${error}`))

module.exports = connection