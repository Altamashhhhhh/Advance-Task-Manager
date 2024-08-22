const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title : {type : String , required : true } ,
    isComplete : {type : Boolean , required : true } ,
    assignee : {type : String , required : true }
})

const taskModel = mongoose.model("task" ,  taskSchema)

module.exports = taskModel