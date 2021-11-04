import { JwtPayload } from "jsonwebtoken";

declare namespace Express {
    export interface RequestWithUser extends Request {
       user:any
    }
 }