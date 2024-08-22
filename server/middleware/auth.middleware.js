const jwt = require("jsonwebtoken")
const auth = async (req, res , next) =>{
    try{
        if(!req.headers.authorization){
            return res.status(404).json({message: "No Token provided in headers"})
        }
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token , process.env.SECRET_KEY , (error , decoded)=>{
            if(error){
                return res.status(404).json({message: "Invalid Token! Please Login again"})
                }
            if(decoded){
                req.user = decoded
                next()
            }
        })
    }catch(error){
        return res.status(404).json({message: "Invalid Token"})
    }

}

module.exports = auth 