"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validate = void 0;
const Str_1 = require("./Str");
function Validate(fields) {
    return function (target, propertyKey, descriptor) {
        let original = descriptor.value;
        descriptor.value = function (req, res, next) {
            let errors = [];
            if (typeof fields == "string") {
                if (!req.body[fields] || req.body[fields] == "")
                    errors.push((0, Str_1.cap)(fields + " can't be empty!"));
            }
            else {
                fields.forEach((field) => {
                    if (!req.body.hasOwnProperty(field) || req.body[field] == "")
                        errors.push((0, Str_1.cap)(field + " can't be empty!"));
                });
            }
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
