import { Request, Response } from "express"
import { User } from "../models/User"


//welcome controller 
export const hello = async (req:Request,res:Response)=>{

    let users = await User.findAll({
        limit:10
    });

    return res.send(users)
}