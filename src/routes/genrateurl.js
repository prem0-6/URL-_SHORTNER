import { Router } from "express";
import User from '../models/user.js';
import Url from '../models/url.js';
import userroute from "./userverification.js";
import { randomBytes } from 'crypto';
import accesstoken from '../middleware/midd.js';

const urlroute = Router();
urlroute.post('/orginalurl',accesstoken,async(req,res)=>{
    const url = req.body;
    const buffer = randomBytes(6);
    const hexstring = buffer.toString('base64');
    const urls =  await new Url ({originalID:url.url,shortID:hexstring,user:req.user._id});
    await urls.save();
    res.json({hexstring});
});
urlroute.get('/shorturl',accesstoken,async(req,res)=>{
    const { shortID } = req.query;
    const findshort = await Url.findOne({ shortID });
    if(!findshort){
        return res.json({message:"Please provide the exact ShortUrl"});
    }
    return res.redirect(findshort.originalID);
});
export default urlroute;
