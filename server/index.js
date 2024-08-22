const express = require("express")
const cors = require("cors")
const app = express()
const dotenv = require("dotenv").config()
const userRouter = require("./routes/user.route")
const taskRouter = require("./routes/task.route")
const connection = require("./config/db")
const auth = require("./middleware/auth.middleware")

app.use(express.json())
app.use(cors())
app.use("/user" , userRouter)
app.use("/task" ,auth ,  taskRouter)

const port = process.env.PORT

app.get("/" , (req, res)=>{
    res.send(`<h1 style="color : royalblue">WELCOME TO THE ADVANCE TASK MANAGER </h1>`)
})

app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`)
})