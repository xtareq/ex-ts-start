import { Request, Response, NextFunction } from "express"
import { cap } from "./Str"



export function Validate(fields:any){
    return function(target:any, propertyKey:string, descriptor:PropertyDescriptor){
        let original = descriptor.value
        descriptor.value = function(req:Request,res:Response, next: NextFunction){
            let errors:any = []
            if(typeof fields == "string"){
                if(!req.body[fields] || req.body[fields] == "") errors.push(cap(fields+" can't be empty!"))
            }else{
                fields.forEach((field:string)=>{
                    if(!req.body.hasOwnProperty(field) || req.body[field] == "") errors.push(cap(field+" can't be empty!"))
                })
            }
            // console.log(errors);
            if(errors.length > 0){
                return res.status(400).json({errors:errors})
            }
            
           return original.apply(this,arguments)

        }

        return descriptor
        
    }

}