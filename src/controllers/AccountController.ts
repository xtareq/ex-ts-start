import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IRequest } from "../@types";
import { Validate } from "../helpers";
import { cap, checkHash, isEmpty, makeHash, randNumber } from "../helpers/Str";
import { Mailer, SMTPOption } from "../lib/mailer";
import { User } from "../models/User";


export class AccountController{

    async getProfile(req:IRequest, res: Response){
        try {
            let isUser = await User.findByPk(req.userId,{
                attributes:{exclude:['password']}
            })
            return res.json({
                message:"Get Profile",
                user: isUser
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message:"Something going wrong!"
            })
        }


    }
}
