import  jwt from "jsonwebtoken"
import { User } from "../model/user.js"

export async function verifyJWT(req,res,next) {
    try {
        const token=req.cookies.accessToken;

        if(!token){
            return res.status(400).json({message:"Unauthorized request"});
        }
    
        const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
        const user=await User.findById(decoded._id).select("-password -refreshToken")
    
        if(!user){
            return res.status(400).json({message:"Invalid Access Token"});
        }
        req.user=user;
        next();
    } catch (error) {
        return res.status(500).json({message:"Invalid Access Token!"});
    }
}