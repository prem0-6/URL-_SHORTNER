import mongoose from "mongoose";
const connectDB = async()=>{
    try{
       await  mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connection Successfull");
    }
    catch(error){
        console.error("Connection Failed");
    }
}
export default connectDB;