"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validate = void 0;
const Validator_1 = require("../lib/Validator");
function Validate(fields) {
    return function (target, propertyKey, descriptor) {
        let original = descriptor.value;
        descriptor.value = function (req, res, next) {
            let errors = [];
            /* if(typeof fields == "string"){
                if(!req.body[fields] || req.body[fields] == "") errors.push(cap(fields+" can't be empty!"))
            }else{
                fields.forEach((field:string)=>{
                    if(!req.body.hasOwnProperty(field) || req.body[field] == "") errors.push(cap(field+" can't be empty!"))
                })
            } */
            const validator = new Validator_1.Validator(fields, req.body);
            errors = validator.validate();
            // console.log(errors);
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors });
            }
            return original.apply(this, arguments);
        };
        return descriptor;
    };
}
exports.Validate = Validate;
