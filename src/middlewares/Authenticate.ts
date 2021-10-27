import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { IRequest } from "../@types";



export  function Authenticate(req:IRequest,res:Response,next:NextFunction){

    
    let token = req.headers.authorization?.split(" ")[1] 
    if(!token)return res.status(401).json({
        message:"Invalid token!"
    })
    
    let secretKey = process.env.JWT_KEY
    
    if(!secretKey)return res.status(500).json({
        message: "JWT key not found!"
    });
    try {
       let payload:any = jwt.verify(token,secretKey)
       if(!payload.userId){
           return res.sendStatus(401);
       }
        req.userId = payload.userId
        return next()
    } catch (error) {
        return res.status(401).json({
            message:"Invalid Token!"
        })
    }
   
}