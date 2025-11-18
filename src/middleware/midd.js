import User from "../models/user.js";
import jwt from "jsonwebtoken";

const accesstoken = async(req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            return res.json({message:"Token required"});
        }
        const debugtoken = jwt.verify(token,process.env.ACCESS_SECRET);
        const isUser = await User.findOne({email:debugtoken.email});
        if(!isUser){
            return res.json({message:"Invalid User"});
        }
        req.user = isUser;
        next();
    }
    catch(error){
        console.log("Error in Middelware");
    }
}
export default accesstoken;