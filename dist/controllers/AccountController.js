"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const User_1 = require("../models/User");
class AccountController {
    getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let isUser = yield User_1.User.findByPk(req.userId, {
                    attributes: { exclude: ['password'] }
                });
                return res.json({
                    message: "Get Profile",
                    user: isUser
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: "Something going wrong!"
                });
            }
        });
    }
}
exports.AccountController = AccountController;
