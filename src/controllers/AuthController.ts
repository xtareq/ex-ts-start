import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { is } from "sequelize/types/lib/operators";
import { Validate } from "../helpers";
import { cap, checkHash, isEmpty, makeHash, randNumber } from "../helpers/Str";
import { Mailer, SMTPOption } from "../lib/mailer";
import { User } from "../models/User";
import { EmailVerifyTemplate } from "../templates/EmailVerify";

const JWT_KEY = process.env.JWT_KEY || "sdfsdf8903)8s9df0#&)08_DSf8S_)8DF*SDF^*&S"



export class AuthController{


    @Validate(['email:type=email','password!:min=6'])
    async login(req:Request, res:Response): Promise<any> {
        try {
            const {email,password} = req.body 

            //find user by email
            const isUser = await User.findOne({where:{email:email}})

            //if not registered
            if(!isUser)return res.status(404).json({message:"User not Found!"})
    
            //is verified
            if(!isUser.verified)return res.status(401).json({message:"User not verified"})
    
            //check password
            if(!checkHash(password,isUser.password))return res.status(401).json({message:"Incorrect Password"})
    
            //generate token 
            const token = jwt.sign({userId:isUser.id},JWT_KEY,{expiresIn:3600})
    
            return res.json({
                token:token,
                user:isUser
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message:'Something going wrong!Please contact your provider'
            })
        }

    }

    @Validate([
    'name',
    'email:type=email',
    'phone:pattern=^(?:\\+?88|0088)?01[15-9]\\d{8}$',
    'password',
    'confirm_password:match=password'
    ])
    async register({body}:Request, res:Response) {
        let isUser = await User.findOne({where:{email:body.email}})

        if(isUser)return res.status(400).json({message:"Email already exits!"})

        body = {...body,
            password:makeHash(body.password),
            verify_code: randNumber(111111,999999)
        }
        try {
            const isUser = await User.create(body)
            const mailer = new Mailer("smtp")
            let template = EmailVerifyTemplate(isUser.name, isUser.verify_code)
            let option: SMTPOption = {
                test: true,
                sender:"Saxon Prime <register@saxonprime.com>",
                receiver:isUser.name+" <"+isUser.email+">",
                subject:"Email Verification Code",
                html: template
            }
            await mailer.send(option)
            return res.json({
                data:isUser,
                message:"Registered Successfully"
            })
        } catch (error) {
            return res.status(500).json({
                message:"Something going wrong!"
            })
        }
        
    }

    @Validate(['email:type=email','verify_code'])
    async verify({body}:Request, res:Response): Promise<any> {
        let isUser = await User.findOne({where:{email:body.email}})

        //if not registered
        if(!isUser)return res.status(404).json({message:"User not Found!"})

        //is verified
        if(isUser.verified)return res.status(400).json({message:"Already verified"})

        // check code 
        if(isUser.verify_code !== body.verify_code)return res.status(400).json({message:"Invalid code!"})

        try {

            let isVerified= await User.update({
                verify_code: null,
                verified: true 
            },{
                where:{
                    email: body.email
                }
            })

            return res.json({
                message:'Verified Successfully!',
                email: body.email
            })
    
        } catch (error) {
            return res.status(500).json({
                message:'Something going wrong!',
                email: body.email
            })
        }
    }

    @Validate(['email:type=email'])
    async reVerify({body}:Request, res:Response): Promise<any> {
        let isUser = await User.findOne({where:{email:body.email}})

        //if not registered
        if(!isUser)return res.status(404).json({message:"User not Found!"})

        //is verified
        if(isUser.verified)return res.status(400).json({message:"Already verified"})

        try {
            let isVerified= await User.update({
                verify_code: randNumber(111111,999999)
            },{
                where:{
                    email: body.email
                }
            })
            return res.json({
                message:'Resend verify code!',
                email: body.email
            })
        } catch (error) {
            return res.status(500).json({
                message:'Something going wrong!',
                email: body.email
            })
        }
    }

    forgetPasswordRequest():Promise<any>{
        throw new Error("Method not implemented.");
    }
    forgetPassword(): Promise<any> {
        throw new Error("Method not implemented.");
    }

}