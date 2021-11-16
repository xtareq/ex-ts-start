import { JwtPayload } from "jsonwebtoken";

declare module Express {
    export interface RequestWithUser extends Request {
       user:any
    }
 }