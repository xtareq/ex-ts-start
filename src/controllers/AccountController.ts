import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Validate } from "../helpers";
import { cap, checkHash, isEmpty, makeHash, randNumber } from "../helpers/Str";
import { Mailer, SMTPOption } from "../lib/mailer";
import { User } from "../models/User";

export class AccountController{

    async getProfile(req:Request, res: Response){

    }
}
