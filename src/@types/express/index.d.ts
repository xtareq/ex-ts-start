import { JwtPayload } from "jsonwebtoken";

declare namespace Express {
    export interface Request {
       userId?:number
    }
 }