const express = require("express")
const taskRouter = express.Router()
const taskModel = require("../models/task.model")


taskRouter.get("/tasks" , async (req, res)=>{
    try{
        const task = await taskModel.find()
        res.status(200).json({task})
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

taskRouter.post("/create" , async (req, res)=>{
    try{
        const {title , isComplete , assignee} = req.body ; 
        const task = new taskModel({title , isComplete , assignee})
        await task.save()
        res.status(200).json({message : "Task Created Successfully"})
    }catch(error){
        res.status(500).json({message : "Error Occured While Creating Task" , error})
    }
})

taskRouter.patch("/update/:id" , async (req, res)=>{
    try{
        const payload = req.body ; 
        const id = req.params.id ;
        const task = await taskModel.findByIdAndUpdate(id , payload , {new : true})
        res.status(200).json({message : "Task Updated Successfully"})
    }catch(error){
        res.status(500).json({message : "Error Occured While Updating Task" , error})
    }
})

taskRouter.delete("/delete/:id" , async (req, res)=>{
    try{
        const id = req.params.id
        await taskModel.findByIdAndDelete(id)
        res.status(200).json({message : "Task Deleted Successfully"})
    }catch(error){
        res.status(500).json({message : "Error Occured While Deleting Task" , error})
    }
} )

module.exports = taskRouter