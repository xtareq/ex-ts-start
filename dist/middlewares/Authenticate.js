"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function Authenticate(req, res, next) {
    var _a;
    let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token)
        return res.status(401).json({
            message: "Invalid token!"
        });
    let secretKey = process.env.JWT_KEY;
    if (!secretKey)
        return res.status(500).json({
            message: "JWT key not found!"
        });
    try {
        let payload = jsonwebtoken_1.default.verify(token, secretKey);
        if (!payload.userId) {
            return res.sendStatus(401);
        }
        req.userId = payload.userId;
        return next();
    }
    catch (error) {
        return res.status(401).json({
            message: "Invalid Token!"
        });
    }
}
exports.Authenticate = Authenticate;
