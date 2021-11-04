import { Request, Response } from "express";
import { IRequest } from "../types";
import { Validate } from "../helpers";
import { checkHash, makeHash } from "../helpers/Str";
import { User } from "../models/User";


export class UploadController{

        async uploadFile(req: IRequest, res: Response){

        }
}
