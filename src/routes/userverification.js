import { Router } from "express";
import User from '../models/user.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { z } from "zod";
const userroute = Router();
const registerSchema = z.object({
    name : z.string(),
    email:z.string().email(),
    password:z.string()
    .min(6)
});
const loginSchema = z.object({
    email:z.string().email(),
    password:z.string()
});

userroute.post('/signup',async(req,res)=>{
    const parseinfo = registerSchema.safeParse(req.body);
    if(!parseinfo.success){
        return res.json({message:" Failed the requirments"})
    }
    const{name,email,password} = parseinfo.data;
    const finduser = await User.findOne({email});
    if(finduser){
        return res.json({message:"Email already exist"});
    }
    const hash = await bcrypt.hash(password,12);
    const newUser = await new User ({name,email,password:hash});
    await newUser.save(); 
    res.json({message:"Registered Succesfully"});
});
userroute.post('/login',async(req,res)=>{
    const parselogin = loginSchema.safeParse(req.body);
    if(!parselogin.success){
        return res.json({message:"Failed the requirments"});
    }
    const{email,password} = parselogin.data;
    const finduser = await User.findOne({email});
    if(!finduser){
        return res.json({message:"Invalid User"})
    }
    const debugpassword = await bcrypt.compare(password,finduser.password);
    if(!debugpassword){
        return res.json({message:"Wrong Password ! "});
    }
    const token = jwt.sign({email},process.env.ACCESS_SECRET);
    res.json({token});
});
export default userroute;