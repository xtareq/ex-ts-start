import { Request } from "express";

export interface IRequest extends Request {
    userId?: number,
    files?: any
}